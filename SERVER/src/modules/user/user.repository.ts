import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, UpdateResult } from 'typeorm';
import { ISearch, IUser } from './interface/user.interface';
import { User } from './entities/user.entity';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(body: IUser): Promise<any> {
    return await this.userRepository.save(body);
  }
  async findAll(data: ISearch): Promise<IUser[]> {
    return await this.userRepository.find({
      where: data.data && [
        { firstName: ILike(`%${data.data}%`) },
        { lastName: ILike(`%${data.data}%`) },
      ],
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }
  async findByEmail(email: string): Promise<IUser> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async updateUser(id: number, body: IUser): Promise<UpdateResult> {
    return await this.userRepository.update(id, body);
  }
  async updateStatus(id: number, body: IUser): Promise<UpdateResult> {
    return await this.userRepository.update(id, body);
  }
}
