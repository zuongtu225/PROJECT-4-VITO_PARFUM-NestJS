import { ProductSizeService } from './productSize.service';
import * as dotenv from 'dotenv';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Post,
  Delete,
} from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { AuthorGuard } from 'src/shared/guards/author.guard';
import { IProductSize } from './interface/productSize.interface';
import { ProductSize } from './entities/productSize.entity';
import { IProduct } from '../product/interface/Product.interface';
dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/productSizes`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
export class ProductSizeController {
  constructor(private readonly productSizeService: ProductSizeService) {}
  @Post()
  @UseGuards(AuthorGuard)
  @UseGuards(AuthenGuard)
  async createProductSize(@Body() body: any): Promise<any> {
    return await this.productSizeService.createProductSizeService(body);
  }
  @Get()
  async getAllProductSizes(): Promise<IProductSize[]> {
    return await this.productSizeService.getAllProductSizeService();
  }
  @Get('/:id')
  async getDetailProductSize(
    @Param('id') id: number,
  ): Promise<ProductSize[] | IResponse> {
    return await this.productSizeService.getDetailProductSize(+id);
  }
  @Put('/')
  @UseGuards(AuthorGuard)
  @UseGuards(AuthenGuard)
  async updateProductSize(@Body() body: any): Promise<any> {
    return await this.productSizeService.updateProductSizeService(body);
  }
  @Delete('/:id')
  @UseGuards(AuthorGuard)
  @UseGuards(AuthenGuard)
  async deleteProduct(@Param('id') id: IProduct): Promise<any> {
    return await this.productSizeService.deleteProductSizeService(id);
  }
}
