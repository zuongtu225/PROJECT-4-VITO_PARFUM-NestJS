import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { IBlog } from './interface/blog.interface';
import { IResponse } from 'src/shared/interfaces/response.interface';

@Injectable()
export class BlogService {
  constructor(private readonly BlogRepository: BlogRepository) {}
  async createBlog(body: IBlog): Promise<IResponse> {
    const response = await this.BlogRepository.create(body);
    if (response) {
      return {
        data: null,
        success: true,
        message: 'Tạo Blog thành công',
      };
    }
  }
  async getAllBlogs(): Promise<IBlog[]> {
    return await this.BlogRepository.findAll();
  }
  async getDetailBlog(id: number): Promise<IBlog | IResponse> {
    const response = await this.BlogRepository.findOne(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id Blog không đúng',
      };
    }
    return response;
  }
  async updateBlog(id: number, body: IBlog): Promise<IResponse> {
    const response = await this.BlogRepository.update(id, body);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Xóa Blog thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id Blog không đúng',
    };
  }
  async deleteBlog(id: number): Promise<IResponse> {
    const response = await this.BlogRepository.delete(id);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Xóa Blog thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id Blog không đúng',
    };
  }
}
