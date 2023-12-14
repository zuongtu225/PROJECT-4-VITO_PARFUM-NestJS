import { Exclude } from 'class-transformer';
import { Address } from 'src/modules/address/entities/address.entity';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  firstName: string;
  @Column({ nullable: true })
  lastName: string;
  @Column()
  avatar: string;
  @Column()
  status: boolean;
  @Column({ unique: true, nullable: false })
  email: string;
  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => Role, {
    eager: true,
  })
  @JoinColumn({ name: 'role' })
  role: Role;
  @OneToMany(() => Cart, (cart) => cart.userId)
  carts: Cart[];

  @OneToMany(() => Address, (address) => address.userId, {
    eager: true,
  })
  address: Address[];
}
