import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { IBlog } from './interface/blog.interface';
import { BlogService } from './blog.service';
import * as dotenv from 'dotenv';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { AuthorGuard } from 'src/shared/guards/author.guard';
dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/blogs`)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthorGuard)
@UseGuards(AuthenGuard)
export class BlogController {
  constructor(private readonly BlogService: BlogService) {}
  @Post()
  async createBlog(@Body() body: IBlog): Promise<IResponse> {
    return await this.BlogService.createBlog(body);
  }
  @Get()
  async getAllBlogs(): Promise<IBlog[]> {
    return await this.BlogService.getAllBlogs();
  }
  @Get('/:id')
  async getDetailBlog(@Param() param): Promise<IBlog | IResponse> {
    const id = Number(param.id);
    return await this.BlogService.getDetailBlog(id);
  }
  @Put('/:id')
  async updateBlog(@Param('id') id: number, @Body() body): Promise<IResponse> {
    return await this.BlogService.updateBlog(id, body);
  }
  @Delete('/:id')
  async deleteBlog(@Param('id') id: number): Promise<IResponse> {
    return await this.BlogService.deleteBlog(id);
  }
}
