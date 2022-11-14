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
  UseGuards,
} from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { CreateNewsDto } from '../dtos/news.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() newsPayload: CreateNewsDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Noticia creada exitosamente',
      data: await this.newsService.create(newsPayload),
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Client)
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Noticias encontradas exitosamente',
      data: await this.newsService.findAll(),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(@Req() req: any, @Body() newsPayload: CreateNewsDto) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Noticia actualizada exitosamente',
      data: await this.newsService.update(req.params.id, newsPayload),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async delete(@Req() req: any) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Noticia eliminada exitosamente',
      data: await this.newsService.delete(req.params.id),
    };
  }
}
