import { CheckoutRepository } from '@Domain/repositories/checkout.repository';
import { CheckoutOrder } from '@Infrastructure/typeorm/models/checkout.model';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CheckoutOrderService {
  constructor(
    @Inject(CheckoutRepository)
    private readonly checkoutRepository: CheckoutRepository,
  ) {}

  async save(orderData: Partial<CheckoutOrder>): Promise<CheckoutOrder> {
    return this.checkoutRepository.save(orderData);
  }

  async find(orderId: number): Promise<CheckoutOrder> {
    return this.checkoutRepository.find(orderId);
  }
}
