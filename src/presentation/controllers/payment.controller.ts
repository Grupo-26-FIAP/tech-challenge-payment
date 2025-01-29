import { PaymentNotificationDto } from '@Application/dtos/request/payment/payment-notification.request.dto';
import { CheckoutUseCase } from '@Application/use-cases/payment/checkout.use-case';
import { FindCheckoutUseCase } from '@Application/use-cases/payment/find-checkout.use-case';
import { PaymentNotificationUseCase } from '@Application/use-cases/payment/payment-notification.use-case';
import { CheckoutOrder } from '@Infrastructure/typeorm/models/checkout.model';
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('/api/payment')
export class PaymentController {
  constructor(
    private readonly checkoutUseCase: CheckoutUseCase,
    private readonly findCheckout: FindCheckoutUseCase,
    private readonly paymentNotificationUseCase: PaymentNotificationUseCase,
  ) {}

  @Get('/checkout/:orderId')
  @ApiResponse({
    status: 200,
    description: 'Checkout feito com sucesso',
    type: CheckoutOrder,
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async checkout(@Param('orderId') orderId: number): Promise<CheckoutOrder> {
    return this.findCheckout.execute(orderId);
  }

  @HttpCode(200)
  @Post('/payment-notification')
  @ApiOperation({
    summary: 'Recebe o Callback da API de pagamento',
  })
  @ApiResponse({
    status: 200,
    description: 'Pagamento realizado com sucesso',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  async create(@Body() dto: PaymentNotificationDto) {
    this.paymentNotificationUseCase.execute(dto);
  }
}
