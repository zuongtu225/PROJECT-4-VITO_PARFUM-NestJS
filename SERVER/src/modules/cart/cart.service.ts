import { BadRequestException, Injectable } from '@nestjs/common';
import { ICart } from './interface/cart.interface';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { CartRepository } from './cart.repository';
import { Cart } from './entities/cart.entity';
@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}
  async createCartService(userId: number, body: ICart): Promise<IResponse> {
    const newCart = {
      userId,
      productSizeId: body.productSizeId,
      quantity: body.quantity,
    };
    const response = await this.cartRepository.create(newCart);
    if (response) {
      return {
        data: null,
        success: true,
        message: 'Tạo Cart thành công',
      };
    }
    throw new BadRequestException('Tạo Cart thất bại');
  }
  async getAllCartService(): Promise<Cart[]> {
    return await this.cartRepository.findAll();
  }
  async getDetailCart(id: number): Promise<ICart[] | IResponse> {
    const response = await this.cartRepository.findAllByUserId(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id Cart không đúng',
      };
    }
    return response;
  }
  async updateCartService(id: number, body: ICart): Promise<IResponse> {
    const response = await this.cartRepository.updateCart(id, body);
    if (response.affected == 1) {
      return {
        data: null,
        success: true,
        message: 'Cập nhật giỏ hàng thành công',
      };
    }
    return {
      data: null,
      success: false,
      message: 'Id Cart không đúng',
    };
  }
  async deleteCartService(id: number): Promise<IResponse> {
    const response = await this.cartRepository.deleteCart(id);
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
      message: 'Id Cart không đúng',
    };
  }
  async deleteCartItem(id: number): Promise<IResponse> {
    const response = await this.cartRepository.deleteCartItem(id);
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
      message: 'Id Cart không đúng',
    };
  }
}
