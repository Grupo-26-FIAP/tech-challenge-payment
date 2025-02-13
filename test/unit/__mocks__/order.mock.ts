import { OrderResponseDto } from '@Application/dtos/response/order/order.response.dto';
import { ProductResponseDto } from '@Application/dtos/response/order/product.response.dto';
import { OrderStatusType } from '@Shared/enums/order-status-type.enum';
import { PaymentStatusType } from '@Shared/enums/payment-status-type.enum';

export const ORDER_RESPONSE_DTO_MOCK: OrderResponseDto = {
  id: 1,
  totalPrice: 100.0,
  estimatedPreparationTime: 30,
  user: 123,
  paymentStatus: PaymentStatusType.PENDING,
  orderStatus: OrderStatusType.NONE,
  createdAt: new Date('2024-01-01T00:00:00Z'),
  updatedAt: new Date('2024-01-02T00:00:00Z'),
  productOrders: [
    {
      id: 1,
      name: 'Hambúrguer',
      category: 'Lanche',
      price: 15.99,
      preparationTime: 20,
      description:
        'Um hambúrguer suculento com carne bovina de primeira e queijo cheddar.',
      enabled: true,
      figureUrl: 'https://example.com/images/hamburguer.png',
    } as ProductResponseDto,
    {
      id: 2,
      name: 'Batata Frita',
      category: 'Acompanhamento',
      price: 9.99,
      preparationTime: 10,
      description: 'Porção de batata frita crocante.',
      enabled: true,
      figureUrl: 'https://example.com/images/batata-frita.png',
    } as ProductResponseDto,
  ],
};
