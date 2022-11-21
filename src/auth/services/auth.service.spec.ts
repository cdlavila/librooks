import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../users/services/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/services/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
        MailService,
        MailerService,
        ConfigService,
        { provide: getRepositoryToken(User), useValue: {} },
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
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
