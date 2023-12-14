import { Exclude } from 'class-transformer';
import { Address } from 'src/modules/address/entities/address.entity';
import { OrderItem } from 'src/modules/orderItem/entities/orderItem.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @PrimaryColumn()
  @Index({ unique: true })
  codeOrder: number;

  @Column()
  status: string;

  @Column({ type: 'decimal', precision: 15 })
  total: number;

  @Column()
  userId: number;

  @Column({ type: 'date' })
  orderDate: Date;
  @Column({ type: 'date' })
  expectedDeliveryDate: Date;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.codeOrder, {
    eager: true,
  })
  orderItems: OrderItem[];

  @ManyToOne(() => Payment, (payment) => payment.orders, { eager: true })
  @JoinColumn({ name: 'paymentId' })
  paymentId: Payment;

  @ManyToOne(() => Address, (address) => address.orders, { eager: true })
  @JoinColumn({ name: 'addressId' })
  addressId: Address;
}
