import { ConfigService } from '@nestjs/config';
import {
  BadGatewayException,
  Inject,
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { USERS_SERVICE } from '@app/users';
import { UsersServiceInterface } from '@app/users/interfaces';
import {
  SignUpUser,
  JWTAuthPayload,
  AuthTokenWithCookiesResponse,
  BaseUser,
} from '@app/types';
import { CryptoService, JwtLibService } from '@app/utils';
import { AuthServiceInterface } from './interfaces';
import { use } from 'passport';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersServiceInterface,
    private readonly jwtService: JwtLibService,
    private readonly cryptoService: CryptoService,
    private readonly configService: ConfigService,
  ) {}

  public async signUpUser(user: SignUpUser): Promise<BaseUser> {
    const emailIsAvailable = await this.usersService.checkEmailAvailability(
      user.email,
    );
    if (!emailIsAvailable)
      throw new BadRequestException(
        'User with corresponding email already exist',
      );

    this.validateConfirmPassword(user.password, user.confirmPassword);

    const hashedPassword = await this.cryptoService.hash(user.password);

    try {
      const newUser = await this.usersService.create({
        ...user,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      if (error?.code === '23505') {
        throw new BadRequestException('User with that email already exists');
      }
      throw new InternalServerErrorException(
        'Something went wrong during signing up',
      );
    }
  }

  public async getAuthorizedUser(
    email: string,
    password: string,
  ): Promise<BaseUser> {
    const user = await this.usersService.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.validatePassword(password, user.password);

    return user;
  }

  public async generateJwtAccesTokenCookie(
    payload: JWTAuthPayload,
  ): Promise<AuthTokenWithCookiesResponse> {
    const accesstoken = await this.jwtService.signJwtAccessToken(payload);

    const cookie = `Authentication=${accesstoken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;

    return {
      cookie,
      token: accesstoken,
    };
  }

  public async generateJwtRefreshTokenCookie(
    payload: JWTAuthPayload,
  ): Promise<AuthTokenWithCookiesResponse> {
    const refreshToken = await this.jwtService.signJwtRefreshToken(payload);

    const cookie = `Refresh=${refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;

    return {
      cookie,
      token: refreshToken,
    };
  }

  public generateLogOutCookie(): string[] {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  public async setHashedRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<boolean | BaseUser> {
    return this.usersService.setHashedRefreshToken(userId, refreshToken);
  }

  public removeRefreshToken(userId: number): Promise<boolean> {
    return this.usersService.removeRefreshToken(userId);
  }

  private validateConfirmPassword(
    password: string,
    confirmPassword: string,
  ): void {
    if (password !== confirmPassword) {
      throw new BadGatewayException({
        message: 'Passwords does not match',
      });
    }
  }

  private validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return this.cryptoService
      .compareHashs(password, hashedPassword)
      .then((result) => {
        if (result) {
          return true;
        }
        throw new UnauthorizedException();
      });
  }
}
