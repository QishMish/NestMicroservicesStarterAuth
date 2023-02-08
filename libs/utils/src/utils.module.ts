import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, registerAs } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtLibService } from './jwt.service';
import { CryptoService } from './crypto.service';

const utilsConfig = registerAs('utils', () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_TIME: +process.env.JWT_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME:
    +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
}));

@Module({
  imports: [ConfigModule.forFeature(utilsConfig), JwtModule],
  providers: [JwtLibService, CryptoService],
  exports: [JwtLibService, CryptoService],
})
export class UtilsLibModule {}
