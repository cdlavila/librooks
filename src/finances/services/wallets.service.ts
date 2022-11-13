import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
import { CreateWalletDto } from '../dtos/wallet.dto';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet) private WalletRepository: Repository<Wallet>,
  ) {}

  async create(data: CreateWalletDto) {
    const newWallet = this.WalletRepository.create(data);
    return await this.WalletRepository.save(newWallet);
  }

  async update(id: string, changes: any) {
    const wallet = await this.WalletRepository.findOne({ where: { id } });
    if (!wallet) {
      throw new NotFoundException(`Billetera ${id} no encontrada`);
    }
    this.WalletRepository.merge(wallet, changes);
    return this.WalletRepository.save(wallet);
  }

  async delete(id: string) {
    const wallet = await this.WalletRepository.findOne({ where: { id } });
    if (!wallet) {
      throw new NotFoundException(`Billetera ${id} no encontrada`);
    }
    return this.WalletRepository.delete(id);
  }
}
