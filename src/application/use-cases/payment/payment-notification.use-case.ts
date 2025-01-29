import { PaymentNotificationDto } from '@Application/dtos/request/payment/payment-notification.request.dto';
import { IPaymentService } from '@Domain/services/payment.service';
import { MessageProducer } from '@Infrastructure/queue/producer/producer.service';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';

@Injectable()
export class PaymentNotificationUseCase {
  constructor(
    @Inject(IPaymentService)
    private readonly paymentService: IPaymentService,
    private readonly messageProducer: MessageProducer,
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
    console.log('validando pagamento');

    const merchantOrder = await this.paymentService.getMerchantOrder(payment);
    if (merchantOrder) {
      const { status, order_status, external_reference } = merchantOrder;
      const paymentReceived = status === 'closed' && order_status === 'paid';

      console.log(
        'valdando status do pagamento - pagamento recebido:',
        paymentReceived,
      );

      if (paymentReceived) {
        await this.messageProducer.sendMessage(
          'payment-status-updated-queue.fifo',
          {
            orderId: external_reference,
            status: PaymentStatusType.APPROVED,
          },
        );
      }
    }
  }

  private handleError(error: any): void {
    console.error('An error occurred while processing the order:', error);
  }
}
