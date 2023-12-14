import { PaymentService } from './payment.service';
import * as dotenv from 'dotenv';
import { IPayment } from './interface/payment.interface';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Post,
  Put,
  Param,
  Delete,
  Query,
  Get,
} from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { Payment } from './entities/payment.entity';
import { AuthorGuard } from 'src/shared/guards/author.guard';
import { ISearch } from '../user/interface/user.interface';

dotenv.config();
const init = process.env.API_URL;
@Controller(`${init}/payments`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthorGuard)
@UseGuards(AuthenGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post()
  async createPayment(@Body() body: IPayment): Promise<IResponse | Payment> {
    return await this.paymentService.createPaymentService(body);
  }
  @Get()
  async getAllPayment(@Query() data: ISearch): Promise<IPayment[]> {
    return await this.paymentService.getAllPaymentService(data);
  }
  @Get('/:id')
  async getDetailPayment(@Param('id') id: number): Promise<IPayment> {
    return await this.paymentService.getDetailPaymentService(id);
  }
  @Put('/:id')
  async updatePayment(
    @Param('id') id: number,
    @Body() body,
  ): Promise<IResponse> {
    return await this.paymentService.updatePaymentService(id, body);
  }
  @Delete('/:id')
  async deletePayment(@Param('id') id: number): Promise<IResponse> {
    return await this.paymentService.deletePayment(id);
  }
}
