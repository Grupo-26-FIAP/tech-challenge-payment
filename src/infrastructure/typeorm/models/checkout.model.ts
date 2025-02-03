import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('checkout_orders')
export class CheckoutOrder {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  in_store_order_id: string;

  @Column()
  qr_data: string;

  @Column()
  order_id: number;
}
