import * as dotenv from 'dotenv';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Get,
  Put,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Post,
  UploadedFiles,
  UploadedFile,
  Request,
  Delete,
} from '@nestjs/common';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { AuthorGuard } from 'src/shared/guards/author.guard';
import { ImageService } from './image.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request as ExpressRequest } from 'express';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { Iimage } from './interface/image.interface';
import { CloudinaryService } from 'src/shared/utils/cloudinary/cloudinary.service';

dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/images`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthorGuard)
@UseGuards(AuthenGuard)
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Post()
  @UseInterceptors(FilesInterceptor('images', 3))
  async createImage(
    @Request() req: ExpressRequest,
    @UploadedFiles()
    files: Express.Multer.File[],
  ): Promise<any> {
    const responseCloud =
      await this.cloudinaryService.uploadMultipleFiles(files);
    return await this.imageService.createImageService(
      +req.body.productId,
      responseCloud,
    );
  }
  @Get()
  async getAllImages(): Promise<Iimage[]> {
    return await this.imageService.getAllImageService();
  }
  @Get('/:id')
  async getDetailImage(@Param('id') id: number): Promise<Iimage | IResponse> {
    return await this.imageService.getDetailImage(id);
  }
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateImage(
    @Param('id') id: number,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<any> {
    const responseCloud = await this.cloudinaryService.uploadSingleFile(file);
    return await this.imageService.updateImageService(+id, responseCloud.url);
  }

  @Delete('/:id')
  async deleteImage(@Param('id') id: number): Promise<IResponse> {
    return await this.imageService.deleteImageService(id);
  }
}
