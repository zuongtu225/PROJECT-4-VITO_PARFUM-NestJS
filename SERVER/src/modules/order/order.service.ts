import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { OrderRepository } from './order.repository';
import { IOrder } from './interface/order.interface';
import { Order } from './entities/order.entity';
@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  async createOrderService(id: number, body: IOrder): Promise<IResponse> {
    const newOrder = {
      ...body,
      userId: id,
    };
    const response = await this.orderRepository.create(newOrder);
    if (response) {
      return {
        success: true,
        message: 'Tạo Order thành công',
        data: response,
      };
    }
    throw new BadRequestException('Tạo Order thất bại');
  }
  async getAllOrderService(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }
  async getDetailOrderService(id: number): Promise<Order | IResponse> {
    const response = await this.orderRepository.getDetailOrder(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id Order không đúng',
      };
    }
    return response;
  }
  async updateOrderService(id: number, body: IOrder): Promise<IResponse> {
    const idCommon = { id: +id, codeOrder: body.codeOrder };
    const response = await this.orderRepository.updateOrder(idCommon, body);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Cập nhật thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id Order không đúng',
    };
  }
  async getHistoryOrderService(id: number): Promise<Order[] | IResponse> {
    const response = await this.orderRepository.getDetailByUser(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id Order không đúng',
      };
    }
    return response;
  }
}
