import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ICart } from './interface/cart.interface';
import { Cart } from './entities/cart.entity';
@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}
  async create(data: ICart): Promise<Cart> {
    return await this.cartRepository.save(data);
  }
  async findAll(): Promise<Cart[]> {
    return await this.cartRepository.find();
  }
  async findAllByUserId(userId: any): Promise<any> {
    return await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.productSizeId', 'productSize')
      .leftJoinAndSelect('productSize.productId', 'product')
      .leftJoinAndSelect('productSize.sizeId', 'size')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('cart.userId', 'user')
      .where('cart.userId = :userId', { userId })
      .getMany();
  }
  async updateCart(id: number, body: ICart): Promise<UpdateResult> {
    return await this.cartRepository.update(id, body);
  }
  async deleteCart(id: number): Promise<DeleteResult> {
    return await this.cartRepository
      .createQueryBuilder()
      .delete()
      .from(Cart)
      .where('userId = :id', { id })
      .execute();
  }
  async deleteCartItem(id: number): Promise<DeleteResult> {
    return await this.cartRepository.delete(id);
  }
}
