import { BadRequestException, Injectable } from '@nestjs/common';
import { IBrand } from './interface/brand.interface';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { BrandRepository } from './brand.repository';
import { ISearch } from '../user/interface/user.interface';
@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}
  async createBrandService(body: IBrand): Promise<IResponse> {
    const response = await this.brandRepository.create(body);
    if (response) {
      return {
        data: null,
        success: true,
        message: 'Tạo Brand thành công',
      };
    }
    throw new BadRequestException('Tạo Brand thất bại');
  }
  async getAllBrandService(data: ISearch): Promise<IBrand[]> {
    return await this.brandRepository.findAll(data);
  }
  async getDetailBrand(id: number): Promise<IBrand | IResponse> {
    const response = await this.brandRepository.findOne(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id Brand không đúng',
      };
    }
    return response;
  }
  async updateBrandService(id: number, body: IBrand): Promise<IResponse> {
    const response = await this.brandRepository.updateBrand(id, body);
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
      message: 'Id Brand không đúng',
    };
  }
  async deleteBrandService(id: number): Promise<IResponse> {
    const response = await this.brandRepository.deleteBrand(id);
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
      message: 'Id Brand không đúng',
    };
  }
}
