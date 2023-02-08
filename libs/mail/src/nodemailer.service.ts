import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { MailServiceInterface } from './interfaces';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class NodeMailerService implements MailServiceInterface {
  private nodeMailer: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodeMailer = createTransport({
      host: configService.get('EMAIL_HOST'),
      port: configService.get('EMAIL_PORT'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  send(options: Mail.Options): void {
    try {
      this.nodeMailer.sendMail(options);
      console.log(`Mail sent to ${options.to}, subject: ${options.subject}`);
    } catch (error) {
      console.error(`Could not send email to: ${options.to} `, error);
    }
  }
}
