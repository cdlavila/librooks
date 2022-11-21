import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        MailerService,
        ConfigService,
        {
          provide: 'MAILER_OPTIONS',
          useValue: {
            transport: {
              host: '',
              port: 587,
              secure: false,
              auth: {
                user: '',
                pass: '',
              },
            },
          },
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
