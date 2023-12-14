import { Exclude } from 'class-transformer';
import { Order } from 'src/modules/order/entities/order.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  address: string;
  @Column()
  phoneNumber: number;
  @Column()
  fullName: string;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.address)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @OneToMany(() => Order, (order) => order.addressId)
  orders: Order[];
}
