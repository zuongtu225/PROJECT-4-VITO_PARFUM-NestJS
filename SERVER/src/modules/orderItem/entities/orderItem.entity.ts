import { Exclude } from 'class-transformer';
import { Order } from 'src/modules/order/entities/order.entity';
import { ProductSize } from 'src/modules/productSize/entities/productSize.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order_item' })
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  quantity: number;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'codeOrder', referencedColumnName: 'codeOrder' })
  codeOrder: Order;

  @ManyToOne(() => ProductSize, { eager: true })
  @JoinColumn({ name: 'productSizeId' })
  productSizeId: ProductSize;
}
