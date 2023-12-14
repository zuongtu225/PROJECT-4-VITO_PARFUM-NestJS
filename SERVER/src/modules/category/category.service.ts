import { BadRequestException, Injectable } from '@nestjs/common';
import { ICategory } from './interface/category.interface';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { CategoryRepository } from './category.repository';
import { ISearch } from '../user/interface/user.interface';
@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategoryService(body: ICategory): Promise<IResponse> {
    const response = await this.categoryRepository.create(body);
    if (response) {
      return {
        data: null,
        success: true,
        message: 'Tạo Category thành công',
      };
    }
    throw new BadRequestException('Tạo Category thất bại');
  }

  async getAllCategoryService(data: ISearch): Promise<ICategory[]> {
    return await this.categoryRepository.findAll(data);
  }

  async getDetailCategory(id: number): Promise<ICategory | IResponse> {
    const response = await this.categoryRepository.findOne(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id Category không đúng',
      };
    }
    return response;
  }

  async updateCategoryService(id: number, body: ICategory): Promise<IResponse> {
    const response = await this.categoryRepository.updateCategory(id, body);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Cập nhật thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id Category không đúng',
    };
  }
  async deleteCategoryService(id: number): Promise<IResponse> {
    const response = await this.categoryRepository.deleteCategory(id);
    console.log(response);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Xoá thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id Category không đúng',
    };
  }
}
