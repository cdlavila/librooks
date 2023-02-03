import { Test, TestingModule } from '@nestjs/testing';
import { AdminsService } from './admins.service';
import { UsersService } from './users.service';
import { MailService } from '../../mail/services/mail.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { User } from '../entities/user.entity';

describe('AdminsService', () => {
  let service: AdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminsService,
        UsersService,
        MailService,
        MailerService,
        ConfigService,
        { provide: getRepositoryToken(Admin), useValue: {} },
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
      ],
    }).compile();

    service = module.get<AdminsService>(AdminsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
