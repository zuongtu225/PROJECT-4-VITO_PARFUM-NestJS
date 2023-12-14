import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IRole } from './interface/role.interface';
import { Role } from './entities/role.entity';
@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async create(body: IRole): Promise<any> {
    const response = await this.roleRepository.save(body);
    return response;
  }
  async findAll(): Promise<IRole[]> {
    return await this.roleRepository.find();
  }
  async findOne(id: number): Promise<IRole> {
    const newInstance = await this.roleRepository.findOneBy({ id: id });
    return newInstance;
  }
  async update(id: number, body: IRole): Promise<UpdateResult> {
    const response = await this.roleRepository.update(id, body);
    return response;
  }
  async delete(id: number): Promise<DeleteResult> {
    const newInstance = await this.roleRepository.delete({ id: id });
    return newInstance;
  }
}
