import { PaymentNotificationDto } from '@Application/dtos/request/payment/payment-notification.request.dto';
import { IPaymentService } from '@Domain/services/payment.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PaymentNotificationUseCase {
  constructor(
    @Inject(IPaymentService)
    private readonly paymentService: IPaymentService,
  ) {}

  async execute(payment: PaymentNotificationDto): Promise<void> {
    try {
      this.validatePayment(payment);
    } catch (error) {
      this.handleError(error);
    }
  }
  private async validatePayment(
    payment: PaymentNotificationDto,
  ): Promise<void> {
    const merchantOrder = await this.paymentService.getMerchantOrder(payment);
    if (merchantOrder) {
      const { status, order_status } = merchantOrder;
      const paymentReceived = status === 'closed' && order_status === 'paid';
      console.log(paymentReceived);

      // Notifica Pagamento Recebido
    }
  }

  private handleError(error: any): void {
    console.error('An error occurred while processing the order:', error);
  }
}
