import { CategoryService } from './category.service';
import * as dotenv from 'dotenv';
import { ICategory } from './interface/category.interface';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { AuthorGuard } from 'src/shared/guards/author.guard';
import { ISearch } from '../user/interface/user.interface';

dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/categories`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthorGuard)
@UseGuards(AuthenGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  async createCategory(@Body() body: ICategory): Promise<IResponse> {
    return await this.categoryService.createCategoryService(body);
  }
  @Get()
  async getAllCategorys(@Query() data: ISearch): Promise<ICategory[]> {
    return await this.categoryService.getAllCategoryService(data);
  }
  @Get('/:id')
  async getDetailCategory(
    @Param('id') id: number,
  ): Promise<ICategory | IResponse> {
    return await this.categoryService.getDetailCategory(id);
  }

  @Put('/:id')
  async updateCategory(
    @Param('id') id: number,
    @Body() body,
  ): Promise<IResponse> {
    return await this.categoryService.updateCategoryService(id, body);
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: number): Promise<IResponse> {
    return await this.categoryService.deleteCategoryService(id);
  }
}
