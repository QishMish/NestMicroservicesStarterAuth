import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MAIL_SERVICE } from './constants';
import { NodeMailerService } from './nodemailer.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: MAIL_SERVICE,
      useClass: NodeMailerService,
    },
  ],
  exports: [MAIL_SERVICE],
})
export class MailModule {}
