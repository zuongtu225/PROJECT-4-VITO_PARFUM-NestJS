import { Exclude } from 'class-transformer';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Image } from 'src/modules/images/entities/image.entity';
import { ProductSize } from 'src/modules/productSize/entities/productSize.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  status: boolean;

  @Column({ nullable: true })
  isBestSeller: boolean;
  @Column('text')
  description: string;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => Category, {
    eager: true,
  })
  category: Category;

  @ManyToOne(() => Brand, {
    eager: true,
  })
  brand: Brand;

  @OneToMany(() => Image, (product) => product.productId, {
    eager: true,
  })
  images: Image[];

  @OneToMany(() => ProductSize, (productSize) => productSize.productId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  productSizes: ProductSize[];
}
