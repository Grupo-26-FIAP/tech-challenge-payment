import { CheckoutResponseDto } from '@Application/dtos/response/payment/checkout.response.dto';
import { CheckoutOrder } from '@Infrastructure/typeorm/models/checkout.model';
import { ObjectId } from 'mongodb';

export const CHECKOUT_ORDER_ENTITY_MOCK: CheckoutOrder = {
  id: new ObjectId('65a1b2c3d4e5f67890123456'),
  in_store_order_id: 'ORDER-12345',
  qr_data: 'https://example.com/qrcode/12345',
  order_id: 1,
};

export const CHECKOUT_REQUEST_DTO_MOCK: CheckoutResponseDto = {
  in_store_order_id: 'mock-in-store-order-id',
  qr_data: 'mock-qr-data',
};
