import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderItemRepository } from './orderItem.repository';
import { IOrderItem } from './interface/orderItem.interface';
import { OrderItem } from './entities/orderItem.entity';

@Injectable()
export class OrderItemService {
  constructor(private readonly orderItemRepository: OrderItemRepository) {}
  async createOrderItemService(body: IOrderItem): Promise<any> {
    const response = await this.orderItemRepository.create(body);
    if (response) {
      return {
        success: true,
        message: 'Tạo OrderItem thành công',
        data: response,
      };
    }
    throw new BadRequestException('Tạo OrderItem thất bại');
  }
  async getAllOrderItemService(): Promise<OrderItem[]> {
    return await this.orderItemRepository.findAll();
  }
}
