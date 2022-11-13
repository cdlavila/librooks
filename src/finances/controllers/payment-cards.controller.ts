import {
  Body,
  Req,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PaymentCardsService } from '../services/payment-cards.service';
import {
  CreatePaymentCardDto,
  UpdatePaymentCardDto,
} from '../dtos/payment-card.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';

@Controller('payment-cards')
export class PaymentCardsController {
  constructor(private readonly paymentCardsService: PaymentCardsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client)
  async create(@Req() req: any, @Body() body: any) {
    const paymentCardPayload: CreatePaymentCardDto = {
      ...body,
      client: req?.user?.client?.id,
    };
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Tarjeta de pago creada exitosamente',
      data: await this.paymentCardsService.create(paymentCardPayload),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client)
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Client)
  async delete(@Param('id') id: string) {
    return this.paymentCardsService.delete(id);
  }
}
