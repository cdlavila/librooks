import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Return } from '../entities/return.entity';
import { UpdateReturnDto } from '../dtos/return.dto';

@Injectable()
export class ReturnsService {
  constructor(
    @InjectRepository(Return) private returnRepository: Repository<Return>,
  ) {}

  async findAll() {
    return await this.returnRepository.find({
      relations: ['purchase'],
    });
  }

  async update(id: string, changes: UpdateReturnDto) {
    const r = await this.returnRepository.findOne({
      where: { id },
    });
    if (!r) {
      throw new NotFoundException(`Devolución ${id} no encontrada`);
    }
    this.returnRepository.merge(r, changes);
    return this.returnRepository.save(r);
  }
}
