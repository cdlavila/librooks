import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { PaymentCardsService } from '../services/payment-cards.service';
import {
  CreatePaymentCardDto,
  UpdatePaymentCardDto,
} from '../dtos/payment-card.dto';

@Controller('payment-cards')
export class PaymentCardsController {
  constructor(private readonly paymentCardsService: PaymentCardsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() paymentCardPayload: CreatePaymentCardDto) {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Tarjeta de pago creada exitosamente',
      data: await this.paymentCardsService.create(paymentCardPayload),
    };
  }

  @Get('/by-client/:clientId')
  @HttpCode(HttpStatus.OK)
  async findAllByClient(@Param('clientId') clientId: string) {
    return {
      statusCode: HttpStatus.OK,
      message: `Tarjetas de pago encontradas exitosamente`,
      data: await this.paymentCardsService.findAllByClient(clientId),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('string') id: string,
    @Body() paymentCardPayload: UpdatePaymentCardDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: `Tarjeta de pago ${id} actualizada exitosamente`,
      data: await this.paymentCardsService.update(id, paymentCardPayload),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return this.paymentCardsService.delete(id);
  }
}
