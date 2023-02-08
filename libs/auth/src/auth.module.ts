import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, LocalStrategy } from './strategies';
import { AUTH_SERVICE } from './constants';
import { UsersLibModule } from '@app/users';
import { UtilsLibModule } from '@app/utils';

const authConfig = registerAs('auth', () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_TIME: +process.env.JWT_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME:
    +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
}));

@Module({
  imports: [
    PassportModule,
    ConfigModule.forFeature(authConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
    UsersLibModule,
    UtilsLibModule,
  ],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    JwtStrategy,
    LocalStrategy,
    JwtRefreshTokenStrategy,
  ],
  exports: [AUTH_SERVICE],
})
export class AuthLibModule {}
