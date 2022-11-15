import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../entities/purchase.entity';
import { UpdatePurchaseDto } from '../dtos/purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
  ) {}

  async findAll() {
    return this.purchasesRepository.find({
      relations: ['client'],
    });
  }

  async update(id: string, changes: UpdatePurchaseDto) {
    const purchase = await this.purchasesRepository.findOne({
      where: { id },
    });
    if (!purchase) {
      throw new NotFoundException(`Compra ${id} no encontrada`);
    }
    this.purchasesRepository.merge(purchase, changes);
    return this.purchasesRepository.save(purchase);
  }
}
