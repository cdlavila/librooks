import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { CreateBookDto, UpdateBookDto } from '../dtos/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() bookPayload: CreateBookDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Libro creado exitosamente',
      data: await this.booksService.create(bookPayload),
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: `Libros encontrados exitosamente`,
      data: await this.booksService.findAll(),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: `Libro ${id} encontrado exitosamente`,
      data: await this.booksService.findOne(id),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() changes: UpdateBookDto) {
    return {
      statusCode: HttpStatus.OK,
      message: `Libro ${id} actualizado exitosamente`,
      data: await this.booksService.update(id, changes),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async delete(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}
