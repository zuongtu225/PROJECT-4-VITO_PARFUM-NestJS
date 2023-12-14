import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeRepository } from './size.repository';
import { SizeService } from './size.service';
import { SizeController } from './Size.controller';
import { UserModule } from '../user/user.module';
import { Size } from './entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Size]), UserModule],
  controllers: [SizeController],
  providers: [SizeService, SizeRepository],
})
export class SizeModule {}
