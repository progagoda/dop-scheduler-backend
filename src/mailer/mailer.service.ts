import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './emailDto';
import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}
  mailTransort() {
    const transport = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      service: 'gmail',
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
    return transport;
  }

  async sendEmail(emailDto: EmailDto) {
    const { from, recipients, subject, html } = emailDto;

    const transport = this.mailTransort();
    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('DEFAULT_MAIL_FROM'),
        address: this.configService.get<string>('APP_NAME'),
      },
      to: recipients,
      subject,
      html,
    };
    try {
      const result = await transport.sendMail(options);
      return result;
    } catch (error) {
      console.log('Error: ' + error);
    }
  }
}
