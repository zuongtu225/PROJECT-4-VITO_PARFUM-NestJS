import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { UserModule } from '../user/user.module';
import { Image } from './entities/image.entity';
import { CloudinaryModule } from 'src/shared/utils/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), UserModule, CloudinaryModule],
  controllers: [ImageController],
  providers: [ImageService, ImageRepository],
})
export class ImageModule {}
