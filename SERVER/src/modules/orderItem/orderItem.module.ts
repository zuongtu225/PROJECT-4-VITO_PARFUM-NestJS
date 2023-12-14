import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemRepository } from './orderItem.repository';
import { OrderItemService } from './orderItem.service';
import { UserModule } from '../user/user.module';
import { OrderItem } from './entities/orderItem.entity';
import { OrderItemController } from './orderItem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem]), UserModule],
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepository],
})
export class OrderItemModule {}
