import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { UsersService } from './users.service';
import { WalletsService } from '../../finances/services/wallets.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';
import { User } from '../entities/user.entity';
import { Wallet } from '../../finances/entities/wallet.entity';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        UsersService,
        WalletsService,
        { provide: getRepositoryToken(Client), useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: getRepositoryToken(Wallet), useValue: {} },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
