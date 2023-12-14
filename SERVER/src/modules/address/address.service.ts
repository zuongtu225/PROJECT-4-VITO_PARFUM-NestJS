import { BadRequestException, Injectable } from '@nestjs/common';
import { IAddress } from './interface/addess.interface';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AddressRepository } from './address.repository';
import { Address } from './entities/address.entity';
import { IUser } from '../user/interface/user.interface';
@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}
  async createAddressService(
    userId: IUser,
    body: IAddress,
  ): Promise<Address | IResponse> {
    const address = {
      ...body,
      userId,
    };
    const response = await this.addressRepository.create(address);
    if (response) {
      return {
        data: response,
        success: true,
        message: 'Tạo Address thành công',
      };
    }
    throw new BadRequestException('Tạo Address thất bại');
  }
  async updateAddressService(id: number, body: IAddress): Promise<IResponse> {
    const response = await this.addressRepository.updateAddress(id, body);
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
      message: 'Id Address không đúng',
    };
  }
  async deleteAddress(id: number): Promise<IResponse> {
    const response = await this.addressRepository.deleteCategory(id);
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
      message: 'Id address không đúng',
    };
  }
}
