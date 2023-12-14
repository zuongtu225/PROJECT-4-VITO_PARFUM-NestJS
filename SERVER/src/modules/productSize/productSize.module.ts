import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ProductSize } from './entities/productSize.entity';
import { ProductSizeController } from './productSize.controller';
import { ProductSizeService } from './productSize.service';
import { ProductSizeRepository } from './productSize.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSize]), UserModule],
  controllers: [ProductSizeController],
  providers: [ProductSizeService, ProductSizeRepository],
})
export class ProductSizeModule {}
