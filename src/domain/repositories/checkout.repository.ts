import { CheckoutOrder } from '@Infrastructure/typeorm/models/checkout.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CheckoutRepository {
  constructor(
    @InjectRepository(CheckoutOrder)
    private readonly checkoutOrderRepository: Repository<CheckoutOrder>,
  ) {}

  async save(orderData: Partial<CheckoutOrder>): Promise<CheckoutOrder> {
    return this.checkoutOrderRepository.save(orderData);
  }

  async find(orderId: number): Promise<CheckoutOrder> {
    return await this.checkoutOrderRepository.findOne({
      where: { order_id: Number(orderId) },
    });
  }
}
