import { Cart } from 'src/modules/cart/entities/cart.entity';
import { OrderItem } from 'src/modules/orderItem/entities/orderItem.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Size } from 'src/modules/size/entities/size.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'product_size' })
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Size, (size) => size.productSizes, { eager: true })
  @JoinColumn({ name: 'sizeId' })
  sizeId: Size;

  @ManyToOne(() => Product, (product) => product.productSizes, { eager: true })
  @JoinColumn({ name: 'productId' })
  productId: Product;

  @OneToMany(() => Cart, (cart) => cart.productSizeId)
  carts: Cart[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.productSizeId)
  orderItems: OrderItem[];
}
