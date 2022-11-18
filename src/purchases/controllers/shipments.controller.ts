import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ShipmentsService } from '../services/shipments.service';
import { CreateShipmentDto, UpdateShipmentDto } from '../dtos/shipment.dto';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() shipmentPayload: CreateShipmentDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: `Envío creado exitosamente`,
      data: await this.shipmentsService.create(shipmentPayload),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() shipmentPayload: UpdateShipmentDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: `Envío actualizado exitosamente`,
      data: await this.shipmentsService.update(id, shipmentPayload),
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: `Envíos encontrados exitosamente`,
      data: await this.shipmentsService.findAll(),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: `Envío encontrado exitosamente`,
      data: await this.shipmentsService.findOne(id),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      message: `Envío eliminado exitosamente`,
      data: await this.shipmentsService.delete(id),
    };
  }
}
