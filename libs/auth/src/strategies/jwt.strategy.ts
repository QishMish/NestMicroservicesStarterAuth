import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { BaseUser, JWTAuthPayload } from '@app/types';
import { USERS_SERVICE } from '@app/users';
import { UsersServiceInterface } from '@app/users';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USERS_SERVICE) readonly usersService: UsersServiceInterface,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  public async validate(payload: JWTAuthPayload): Promise<BaseUser> {
    const user = await this.usersService.findOne({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
