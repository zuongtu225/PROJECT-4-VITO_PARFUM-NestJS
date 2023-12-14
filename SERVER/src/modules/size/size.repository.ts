import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ISize } from './interface/size.interface';
import { Size } from './entities/size.entity';
@Injectable()
export class SizeRepository {
  constructor(
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}
  async create(body: ISize): Promise<any> {
    const response = await this.sizeRepository.save(body);
    return response;
  }
  async findAll(): Promise<ISize[]> {
    const response = await this.sizeRepository.find();
    return response;
  }
  async findOne(id: number): Promise<ISize> {
    const response = await this.sizeRepository.findOneBy({ id });
    return response;
  }
  async updateSize(id: number, body: ISize): Promise<UpdateResult> {
    const response = await this.sizeRepository.update(id, body);
    return response;
  }
  async deleteSize(id: number): Promise<DeleteResult> {
    const response = await this.sizeRepository.delete(id);
    return response;
  }
}
