export class OrderCreatedEvent {
  constructor(
    public totalPrice: number,
    public createdAt: Date,
    public orderItems: OrderItemEvent[],
    public userId?: number,
    public id?: number,
    public updatedAt?: Date,
  ) {}
}

export class OrderItemEvent {
  constructor(
    public quantity: number,
    public productId: number,
    public createdAt: Date,
    public price: number,
  ) {}
}
