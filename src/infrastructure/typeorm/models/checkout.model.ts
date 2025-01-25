import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('Checkout_orders')
export class CheckoutOrder {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  in_store_order_id: string;

  @Column()
  qr_data: string;
}
