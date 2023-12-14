import { BrandService } from './brand.service';
import * as dotenv from 'dotenv';
import { IBrand } from './interface/brand.interface';
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
  Query,
} from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { AuthorGuard } from 'src/shared/guards/author.guard';
import { ISearch } from '../user/interface/user.interface';
dotenv.config();
const init = process.env.API_URL;
@Controller(`${init}/brands`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @Post()
  @UseGuards(AuthorGuard)
  @UseGuards(AuthenGuard)
  async createBrand(@Body() body: IBrand): Promise<IResponse> {
    return await this.brandService.createBrandService(body);
  }
  @Get()
  async getAllBrands(@Query() data: ISearch): Promise<IBrand[]> {
    return await this.brandService.getAllBrandService(data);
  }
  @Get('/:id')
  async getDetailBrand(@Param('id') id: number): Promise<IBrand | IResponse> {
    return await this.brandService.getDetailBrand(id);
  }
  @Put('/:id')
  async updateBrand(@Param('id') id: number, @Body() body): Promise<IResponse> {
    return await this.brandService.updateBrandService(id, body);
  }
  @Delete('/:id')
  async deleteBrand(@Param('id') id: number): Promise<IResponse> {
    return await this.brandService.deleteBrandService(id);
  }
}
