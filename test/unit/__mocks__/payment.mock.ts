import { PaymentNotificationDto } from '@Application/dtos/request/payment/payment-notification.request.dto';
import {
  PaymentRequestDto,
  ProductItem,
} from '@Application/dtos/request/payment/payment.request.dto';

export const PAYMENT_NOTIFICATION_REQUEST_DTO_MOCK: PaymentNotificationDto = {
  topic: 'merchant_order',
  resource: 'resource',
};

export const PAYMENT_REQUEST_DTO_MOCK: PaymentRequestDto = {
  external_reference: '1',
  title: 'Pedido - 1',
  description: 'Combo de lanches',
  notification_url: 'https://example.com/webhook/payment',
  total_amount: 100.0,
  items: [
    {
      description: '1',
      title:
        'Um hambúrguer suculento com carne bovina de primeira e queijo cheddar.',
      quantity: 1,
      category: 'marketplace',
      unit_measure: 'unit',
      unit_price: 15.99,
      total_amount: 15.99,
    } as ProductItem,
    {
      description: '2',
      title: 'Porção de batata frita crocante.',
      quantity: 1,
      category: 'marketplace',
      unit_measure: 'unit',
      unit_price: 9.99,
      total_amount: 9.99,
    } as ProductItem,
  ],
};
