import { Injectable, NotFoundException } from '@nestjs/common';
import { News } from '../entities/news.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNewsDto, UpdateNewsDto } from '../dtos/news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
  ) {}

  async create(newsData: CreateNewsDto) {
    const newNews = this.newsRepository.create(newsData);
    return this.newsRepository.save(newNews);
  }

  async findAll() {
    return this.newsRepository.find();
  }

  async update(id: string, changes: UpdateNewsDto) {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException(`Noticia ${id} no encontrada`);
    }
    this.newsRepository.merge(news, changes);
    return this.newsRepository.save(news);
  }

  async delete(id: string) {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException(`Noticia ${id} no encontrada`);
    }
    return this.newsRepository.delete(id);
  }
}
