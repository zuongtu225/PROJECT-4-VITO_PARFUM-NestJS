import { Exclude } from 'class-transformer';
import { Product } from 'src/modules/product/entities/product.entity';
import { ProductSize } from 'src/modules/productSize/entities/productSize.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sizes' })
export class Size {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  size: string;
  @Column({ unique: true })
  percent: number;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
  @OneToMany(() => ProductSize, (productSize) => productSize.sizeId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  productSizes: ProductSize[];
}
