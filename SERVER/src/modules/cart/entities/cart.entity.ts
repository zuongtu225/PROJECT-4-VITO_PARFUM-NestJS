import { Exclude } from 'class-transformer';
import { ProductSize } from 'src/modules/productSize/entities/productSize.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => ProductSize, (productSize) => productSize.carts, {
    eager: true,
  })
  @JoinColumn({ name: 'productSizeId' })
  productSizeId: ProductSize;

  @ManyToOne(() => User, (user) => user.carts, { eager: true })
  @JoinColumn({ name: 'userId' })
  userId: User;
}
