import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../../users/entities/admin.entity';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
import { CreateWalletDto } from '../dtos/wallet.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Admin) private WalletRepository: Repository<Wallet>,
  ) {}

  async create(data: CreateWalletDto) {
    const newWallet = this.WalletRepository.create(data);
    return await this.WalletRepository.save(newWallet);
  }

  async findOne(id: string) {
    const wallet = await this.WalletRepository.findOne({
      where: { id },
    });
    if (!wallet) {
      throw new NotFoundException(`Billetera ${id} no encontrada`);
    }
    return wallet;
  }

  async update(id: string, changes: any) {
    const wallet = await this.WalletRepository.findOne({ where: { id } });
    if (!wallet) {
      throw new NotFoundException(`Billetera ${id} no encontrada`);
    }
    this.WalletRepository.merge(wallet, changes);
    return this.WalletRepository.save(wallet);
  }
}
