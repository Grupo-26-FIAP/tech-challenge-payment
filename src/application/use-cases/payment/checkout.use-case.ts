import { OrderResponseDto } from '@Application/dtos/response/order/order.response.dto';
import { CheckoutResponseDto } from '@Application/dtos/response/payment/checkout.response.dto';
import { PaymentMapper } from '@Application/mappers/payment.mapper';
import { CheckoutOrderService } from '@Domain/services/checkout.service.impl';
import { IPaymentService } from '@Domain/services/payment.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CheckoutUseCase {
  constructor(
    @Inject(IPaymentService)
    private readonly paymentService: IPaymentService,

    @Inject(CheckoutOrderService)
    private readonly checkoutOrderService: CheckoutOrderService,
  ) {}

  async execute(dto: OrderResponseDto): Promise<CheckoutResponseDto> {
    const payment = PaymentMapper.ToPaymentRequestDto(
      dto,
      this.paymentService.getNotificationUrl(),
    );

    console.log('Payment dto created:', payment);

    const checkout = await this.paymentService.createPayment(payment);

    console.log('Checkout created:', checkout);

    await this.checkoutOrderService.save({
      in_store_order_id: checkout.in_store_order_id,
      qr_data: checkout.qr_data,
      order_id: dto.id,
    });

    return checkout;
  }
}
