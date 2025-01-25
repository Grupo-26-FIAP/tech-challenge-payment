import { CheckoutOrder } from '@Infrastructure/typeorm/models/checkout.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CheckoutRepository {
  constructor(
    @InjectRepository(CheckoutOrder)
    private readonly repository: Repository<CheckoutOrder>,
  ) {}

  async save(orderData: Partial<CheckoutOrder>): Promise<CheckoutOrder> {
    return this.repository.save(orderData);
  }
}
