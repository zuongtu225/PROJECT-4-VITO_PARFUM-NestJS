import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { ProductSizeDto } from './dto/productSize.dto';
import { IProductSize } from './interface/productSize.interface';
import { ProductSizeRepository } from './productSize.repository';
import { ProductSize } from './entities/productSize.entity';
import { IProduct } from '../product/interface/Product.interface';
@Injectable()
export class ProductSizeService {
  constructor(private readonly productSizeRepository: ProductSizeRepository) {}
  async createProductSizeService(body: ProductSizeDto): Promise<IResponse> {
    let response: IProductSize;
    for (const size of body.sizeId) {
      const productSize: IProductSize = {
        productId: body.productId,
        sizeId: size,
      };
      response = await this.productSizeRepository.create(productSize);
    }
    if (response) {
      return {
        success: true,
        message: 'Tạo ProductSize thành công',
        data: '',
      };
    }
    throw new BadRequestException('Tạo ProductSize thất bại');
  }

  async getAllProductSizeService(): Promise<IProductSize[]> {
    return await this.productSizeRepository.findAll();
  }
  async getDetailProductSize(id: number): Promise<ProductSize[] | IResponse> {
    const response = await this.productSizeRepository.findOne(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id ProductSize không đúng',
      };
    }
    return response;
  }
  async updateProductSizeService(body: ProductSizeDto): Promise<any> {
    // let response: IProductSize;
    for (const size of body.sizeId) {
      const productSize: IProductSize = {
        productId: body.productId,
        sizeId: size,
      };
      console.log(body);
      // response =
      // await this.productSizeRepository.updateProductSize(productSize);
    }
    // if (response) {
    //   return {
    //     success: true,
    //     message: 'Tạo ProductSize thành công',
    //     data: '',
    //   };
    // }
    // throw new BadRequestException('Tạo ProductSize thất bại');
  }
  async deleteProductSizeService(id: IProduct): Promise<IResponse> {
    const response = await this.productSizeRepository.delete(id);
    if (response.affected > 0) {
      return {
        data: null,
        success: true,
        message: 'Xoá thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id product không đúng',
    };
  }
}
