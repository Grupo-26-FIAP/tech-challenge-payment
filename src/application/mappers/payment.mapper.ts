import {
  PaymentRequestDto,
  ProductItem,
} from '@Application/dtos/request/payment/payment.request.dto';
import { OrderCreatedEvent } from '@Domain/events/order-created.event';

export class PaymentMapper {
  static EventToPaymentRequestDto(
    event: OrderCreatedEvent,
    notificationUrl: string,
  ): PaymentRequestDto {
    const payment = new PaymentRequestDto();
    payment.external_reference = event.id.toString();
    payment.title = `Pedido - ${event.id}`;
    payment.description = `Combo de lanches`;
    payment.notification_url = notificationUrl;
    payment.total_amount = event.totalPrice;
    payment.items = event.orderItems.map((orderItem) => {
      const item = new ProductItem();
      item.description = orderItem.productId.toString(); //temporário
      item.title = orderItem.productId.toString(); //temporário
      item.quantity = orderItem.quantity;
      item.category = 'marketplace'; //temporário
      item.unit_measure = 'unit';
      item.unit_price = Number(orderItem.price);
      item.total_amount = Number(orderItem.price);
      return item;
    });
    return payment;
  }
}
