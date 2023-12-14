import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthenModule } from '../auth/authen.module';
import { CloudinaryModule } from 'src/shared/utils/cloudinary/cloudinary.module';

// user.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthenModule, CloudinaryModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
