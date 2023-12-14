import { Exclude } from 'class-transformer';
import { Order } from 'src/modules/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  title: string;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @OneToMany(() => Order, (order) => order.paymentId, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  orders: Order[];
}
