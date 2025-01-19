import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('merchant_orders')
export class MerchantOrder {
  @ObjectIdColumn()
  _id: string;

  @Column()
  id: number;

  @Column()
  status: string;

  @Column()
  external_reference: string;

  @Column()
  preference_id: string;

  @Column(() => Pay)
  payments: Pay[];

  @Column('simple-array')
  shipments: any[];

  @Column('simple-array')
  payouts: any[];

  @Column(() => Collector)
  collector: Collector;

  @Column()
  marketplace: string;

  @Column()
  notification_url: string;

  @Column()
  date_created: string;

  @Column()
  last_updated: string;

  @Column({ nullable: true })
  sponsor_id: string | null;

  @Column()
  shipping_cost: number;

  @Column()
  total_amount: number;

  @Column()
  site_id: string;

  @Column()
  paid_amount: number;

  @Column()
  refunded_amount: number;

  @Column(() => Payer)
  payer: Payer;

  @Column(() => Item)
  items: Item[];

  @Column()
  cancelled: boolean;

  @Column({ nullable: true })
  additional_info: string;

  @Column({ nullable: true })
  application_id: string | null;

  @Column()
  is_test: boolean;

  @Column()
  order_status: string;

  @Column()
  client_id: string;
}

export class Pay {
  @Column()
  id: number;

  @Column()
  transaction_amount: number;

  @Column()
  total_paid_amount: number;

  @Column()
  shipping_cost: number;

  @Column()
  currency_id: string;

  @Column()
  status: string;

  @Column()
  status_detail: string;

  @Column()
  operation_type: string;

  @Column()
  date_approved: string;

  @Column()
  date_created: string;

  @Column()
  last_modified: string;

  @Column()
  amount_refunded: number;
}

export class Collector {
  @Column()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column()
  nickname: string;
}

export class Payer {
  @Column()
  id: number;

  @Column({ nullable: true })
  email: string;
}

export class Item {
  @Column()
  id: string;

  @Column()
  category_id: string;

  @Column()
  currency_id: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  picture_url: string | null;

  @Column()
  title: string;

  @Column()
  quantity: number;

  @Column()
  unit_price: number;
}
