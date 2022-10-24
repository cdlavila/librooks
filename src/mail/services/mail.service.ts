import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private configService: ConfigService;
  constructor(
    private readonly mailerService: MailerService,
    @Inject(ConfigService) configService: ConfigService,
  ) {
    this.configService = configService;
  }

  async sendMail(email: string, subject: string, text: string) {
    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get<string>('auth.email'),
      subject,
      text,
    });
  }
}
