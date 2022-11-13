import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { CreateNewsDto } from '../dtos/news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() newsPayload: CreateNewsDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Noticia creada exitosamente',
      data: await this.newsService.create(newsPayload),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Noticia eliminada exitosamente',
      data: await this.newsService.delete(req.params.id),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Req() req: any, @Body() newsPayload: CreateNewsDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Noticia actualizada exitosamente',
      data: await this.newsService.update(req.params.id, newsPayload),
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Noticias encontradas exitosamente',
      data: await this.newsService.findAll(),
    };
  }
}
