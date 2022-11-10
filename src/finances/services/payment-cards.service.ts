import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentCard } from '../entities/payment-card';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreatePaymentCardDto,
  UpdatePaymentCardDto,
} from '../dtos/payment-card.dto';

@Injectable()
export class PaymentCardsService {
  constructor(
    @InjectRepository(PaymentCard)
    private paymentCardsRepository: Repository<PaymentCard>,
  ) {}

  async create(data: CreatePaymentCardDto) {
    const newCard = this.paymentCardsRepository.create(data);
    return this.paymentCardsRepository.save(newCard);
  }

  // Find all payment cards by client
  async findAllByClient(clientId: string) {
    return this.paymentCardsRepository.find({ where: { client: clientId } });
  }

  async update(id: string, changes: UpdatePaymentCardDto) {
    const card = await this.paymentCardsRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Tarjeta ${id} no encontrada`);
    }
    this.paymentCardsRepository.merge(card, changes);
    return this.paymentCardsRepository.save(card);
  }

  async delete(id: string) {
    const paymentCard = await this.paymentCardsRepository.findOne({
      where: { id },
    });
    if (!paymentCard) {
      throw new NotFoundException(`Tarjeta ${id} no encontrada`);
    }
    return this.paymentCardsRepository.delete(id);
  }
}
