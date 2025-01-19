import { CreateCheckoutRequestDto } from '@Application/dtos/request/payment/create-checkout.dto';
import { CheckoutResponseDto } from '@Application/dtos/response/payment/checkout.response';
import { PaymentMapper } from '@Application/mappers/payment.mapper';
import { IPaymentService } from '@Domain/services/payment.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CheckoutUseCase {
  constructor(
    @Inject(IPaymentService)
    private readonly paymentService: IPaymentService,
  ) {}

  async execute(dto: CreateCheckoutRequestDto): Promise<CheckoutResponseDto> {
    const payment = PaymentMapper.ToPaymentRequestDto(
      this.paymentService.getNotificationUrl(),
    );
    return await this.paymentService.createPayment(payment);
  }
}
