import { Injectable } from '@nestjs/common';
import { ISearch, IUser } from './interface/user.interface';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getAllUsers(data: ISearch): Promise<IUser[]> {
    return await this.userRepository.findAll(data);
  }
  async getDetailUser(id: number): Promise<User | IResponse> {
    const response = await this.userRepository.findOne(id);
    if (response == null) {
      return {
        data: null,
        success: false,
        message: 'Id User không đúng',
      };
    }
    return response;
  }
  async findByEmail(email: string): Promise<IUser> {
    const response = await this.userRepository.findByEmail(email);
    return response;
  }
  async updateUserService(id: number, body: any): Promise<IResponse> {
    const response = await this.userRepository.updateUser(id, body);
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
      message: 'Id User không đúng',
    };
  }
  async updateStatusService(id: number, body: IUser): Promise<IResponse> {
    const response = await this.userRepository.updateStatus(id, body);
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
      message: 'Id User không đúng',
    };
  }
}
