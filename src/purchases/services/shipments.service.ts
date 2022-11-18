import { Injectable, NotFoundException } from '@nestjs/common';
import { Shipment } from '../entities/shipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateShipmentDto } from '../dtos/shipment.dto';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentsRepository: Repository<Shipment>,
  ) {}

  async findAll() {
    return this.shipmentsRepository.find({
      relations: ['client'],
    });
  }

  async update(id: string, changes: UpdateShipmentDto) {
    const shipment = await this.shipmentsRepository.findOne({
      where: { id },
    });
    if (!shipment) {
      throw new NotFoundException(`Envío ${id} no encontrado`);
    }
    this.shipmentsRepository.merge(shipment, changes);
    return this.shipmentsRepository.save(shipment);
  }

  async delete(id: string) {
    const shipment = await this.shipmentsRepository.findOne({
      where: { id },
    });
    if (!shipment) {
      throw new NotFoundException(`Envío ${id} no encontrado`);
    }
    return this.shipmentsRepository.remove(shipment);
  }

  async create(data) {
    const newShipment = this.shipmentsRepository.create(data);
    return this.shipmentsRepository.save(newShipment);
  }

  async findOne(id: string) {
    const shipment = await this.shipmentsRepository.findOne({
      where: { id },
    });
    if (!shipment) {
      throw new NotFoundException(`Envío ${id} no encontrado`);
    }
    return shipment;
  }
}
