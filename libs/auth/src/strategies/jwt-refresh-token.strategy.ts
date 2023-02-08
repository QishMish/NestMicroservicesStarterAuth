import { JWTAuthPayload, BaseUser } from '@app/types';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UsersServiceInterface, USERS_SERVICE } from '@app/users';
import { CryptoService } from '@app/utils';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersServiceInterface,
    private readonly configService: ConfigService,
    private readonly cryptoService: CryptoService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Refresh,
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  public async validate(
    request: Request,
    payload: JWTAuthPayload,
  ): Promise<BaseUser> {
    const user = await this.usersService.findOne({
      where: {
        id: payload.userId,
      },
    });

    const refreshToken = await this.cryptoService.compareHashs(
      request.cookies.Refresh,
      user.hashedRefreshToken,
    );

    if (!refreshToken) {
      return void 0;
    }

    return user;
  }
}
