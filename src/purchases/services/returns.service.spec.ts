import { Test, TestingModule } from '@nestjs/testing';
import { ReturnsService } from './returns.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Return } from '../entities/return.entity';

describe('ReturnsService', () => {
  let service: ReturnsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReturnsService,
        { provide: getRepositoryToken(Return), useValue: {} },
      ],
    }).compile();

    service = module.get<ReturnsService>(ReturnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
