import { OrderItemService } from './orderItem.service';
import * as dotenv from 'dotenv';
import { IOrderItem } from './interface/orderItem.interface';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Get,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { OrderItem } from './entities/orderItem.entity';
dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/orderItems`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthenGuard)
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
  @Post()
  async createOrderItem(@Body() body: IOrderItem): Promise<IResponse> {
    return await this.orderItemService.createOrderItemService(body);
  }
  @Get()
  async getAllOrderItems(): Promise<OrderItem[]> {
    return await this.orderItemService.getAllOrderItemService();
  }
}
