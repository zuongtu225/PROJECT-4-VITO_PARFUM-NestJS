import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IOrder, IidCommon } from './interface/order.interface';
import { Order } from './entities/order.entity';
import { ISearch } from '../user/interface/user.interface';
@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}
  async create(body: IOrder): Promise<Order> {
    return await this.orderRepository.save(body);
  }
  async findAll(): Promise<Order[]> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.paymentId', 'paymentId')
      .leftJoinAndSelect('order.orderItems', 'OrderItem')
      .leftJoinAndSelect('OrderItem.productSizeId', 'productSizeId')
      .leftJoinAndSelect('productSizeId.productId', 'productId')
      .leftJoinAndSelect('productSizeId.sizeId', 'sizeId')
      .leftJoinAndSelect('order.addressId', 'address')
      .orderBy('order.status', 'DESC')
      .getMany();
  }
  async getDetailOrder(id: number): Promise<Order> {
    return await this.orderRepository.findOneBy({ id });
  }
  async getDetailByUser(id: number): Promise<Order[]> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.paymentId', 'paymentId')
      .leftJoinAndSelect('order.orderItems', 'OrderItem')
      .leftJoinAndSelect('OrderItem.productSizeId', 'productSizeId')
      .leftJoinAndSelect('productSizeId.productId', 'productId')
      .leftJoinAndSelect('productSizeId.sizeId', 'sizeId')
      .leftJoinAndSelect('order.addressId', 'address')
      .where('order.userId = :userId', { userId: id })
      .orderBy('order.status', 'DESC')
      .getMany();
  }
  async updateOrder(idCommon: IidCommon, body: any): Promise<UpdateResult> {
    return await this.orderRepository.update(idCommon, body);
  }
}
