import { BadRequestException, Injectable } from '@nestjs/common';
import { IPayment } from './interface/payment.interface';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { PaymentRepository } from './payment.repository';
import { Payment } from './entities/payment.entity';
import { ISearch, IUser } from '../user/interface/user.interface';
@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}
  async createPaymentService(body: IPayment): Promise<Payment | IResponse> {
    const response = await this.paymentRepository.create(body);
    if (response) {
      return {
        data: response,
        success: true,
        message: 'Tạo Payment thành công',
      };
    }
    throw new BadRequestException('Tạo Payment thất bại');
  }
  async getAllPaymentService(data: ISearch): Promise<Payment[]> {
    return await this.paymentRepository.findAll(data);
  }
  async getDetailPaymentService(id: number): Promise<Payment> {
    return await this.paymentRepository.findDetail(id);
  }
  async updatePaymentService(id: number, body: IPayment): Promise<IResponse> {
    const response = await this.paymentRepository.updatePayment(id, body);
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
      message: 'Id Payment không đúng',
    };
  }
  async deletePayment(id: number): Promise<IResponse> {
    const response = await this.paymentRepository.deleteCategory(id);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Xoá thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id Payment không đúng',
    };
  }
}
