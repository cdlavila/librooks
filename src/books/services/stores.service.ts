import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from '../entities/store.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto, UpdateStoreDto } from '../dtos/store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async create(data: CreateStoreDto) {
    const newStore = await this.storeRepository.create(data);
    return this.storeRepository.save(newStore);
  }

  async findAll() {
    return this.storeRepository.find();
  }

  async findOne(id: string) {
    const store = await this.storeRepository.findOne({
      where: { id },
    });
    if (!store) {
      throw new NotFoundException(`Tienda ${id} no encontrada`);
    }
    return store;
  }

  async update(id: string, changes: UpdateStoreDto) {
    const store = await this.storeRepository.findOne({
      where: { id },
    });
    if (!store) {
      throw new NotFoundException(`Tienda ${id} no encontrada`);
    }
    this.storeRepository.merge(store, changes);
    return this.storeRepository.save(store);
  }

  async delete(id: string) {
    const store = await this.storeRepository.findOne({
      where: { id },
    });
    if (!store) {
      throw new NotFoundException(`Tienda ${id} no encontrada`);
    }
    return this.storeRepository.delete(id);
  }
}
