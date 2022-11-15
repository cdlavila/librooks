import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from '../services/bookings.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { UpdateBookingDto } from '../dtos/booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: `Reservas encontradas exitosamente`,
      data: await this.bookingsService.findAll(),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() changes: UpdateBookingDto) {
    return {
      statusCode: HttpStatus.OK,
      message: `Reserva actualizada exitosamente`,
      data: await this.bookingsService.update(id, changes),
    };
  }
}
