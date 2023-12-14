import { BadRequestException, Injectable } from '@nestjs/common';
import { ISize } from './interface/size.interface';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { SizeRepository } from './size.repository';
@Injectable()
export class SizeService {
  constructor(private readonly sizeRepository: SizeRepository) {}
  async createSizeService(body: ISize): Promise<IResponse> {
    const response = await this.sizeRepository.create(body);
    if (response) {
      return {
        data: null,
        success: true,
        message: 'Tạo Size thành công',
      };
    }
    throw new BadRequestException('Tạo Size thất bại');
  }
  async getAllSizeService(): Promise<ISize[]> {
    return await this.sizeRepository.findAll();
  }
  async getDetailSize(id: number): Promise<ISize | IResponse> {
    const response = await this.sizeRepository.findOne(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id Size không đúng',
      };
    }
    return response;
  }
  async updateSizeService(id: number, body: ISize): Promise<IResponse> {
    const response = await this.sizeRepository.updateSize(id, body);
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
      message: 'Id Size không đúng',
    };
  }
  async deleteSizeService(id: number): Promise<IResponse> {
    const response = await this.sizeRepository.deleteSize(id);
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
      message: 'Id Size không đúng',
    };
  }
}
