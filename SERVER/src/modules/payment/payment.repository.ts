import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { IPayment } from './interface/payment.interface';
import { Payment } from './entities/payment.entity';
import { ISearch } from '../user/interface/user.interface';
@Injectable()
export class PaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}
  async create(body: IPayment): Promise<Payment> {
    return await this.paymentRepository.save(body);
  }
  async findAll(data: ISearch): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: data.data && { title: ILike(`%${data.data}%`) },
    });
  }
  async findDetail(id: number): Promise<Payment> {
    return await this.paymentRepository.findOneBy({ id });
  }
  async updatePayment(id: number, body: IPayment): Promise<UpdateResult> {
    return await this.paymentRepository.update(id, body);
  }
  async deleteCategory(id: number): Promise<DeleteResult> {
    return await this.paymentRepository.delete(id);
  }
}
