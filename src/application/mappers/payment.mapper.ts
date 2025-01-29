import {
  PaymentRequestDto,
  ProductItem,
} from '@Application/dtos/request/payment/payment.request.dto';
import { OrderResponseDto } from '@Application/dtos/response/order/order.response.dto';

export class PaymentMapper {
  static ToPaymentRequestDto(
    dto: OrderResponseDto,
    notificationUrl: string,
  ): PaymentRequestDto {
    const payment = new PaymentRequestDto();
    payment.external_reference = dto.id.toString();
    payment.title = `Pedido - ${dto.id}`;
    payment.description = `Combo de lanches`;
    payment.notification_url = notificationUrl;
    payment.total_amount = dto.totalPrice;
    payment.items = dto.productOrders.map((orderItem) => {
      const item = new ProductItem();
      item.description = orderItem.id.toString(); //temporário
      item.title = orderItem.description.toString(); //temporário
      item.quantity = 1;
      item.category = 'marketplace'; //temporário
      item.unit_measure = 'unit';
      item.unit_price = Number(orderItem.price);
      item.total_amount = Number(orderItem.price);
      return item;
    });
    return payment;
  }
}
