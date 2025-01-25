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
    payment.total_amount = 10;
    payment.items = dto.productOrders.map((orderItem) => {
      const item = new ProductItem();
      item.description = orderItem.productId.toString(); //temporário
      item.title = orderItem.productId.toString(); //temporário
      item.quantity = orderItem.quantity;
      item.category = 'marketplace'; //temporário
      item.unit_measure = 'unit';
      item.unit_price = 10;
      item.total_amount = 10;
      return item;
    });
    return payment;
  }
}
