import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IBlog } from './interface/blog.interface';
import { Blog } from './entities/blog.entity';
@Injectable()
export class BlogRepository {
  constructor(
    @InjectRepository(Blog)
    private BlogRepository: Repository<Blog>,
  ) {}
  async create(body: IBlog): Promise<any> {
    const response = await this.BlogRepository.save(body);
    return response;
  }
  async findAll(): Promise<IBlog[]> {
    return await this.BlogRepository.find();
  }
  async findOne(id: number): Promise<IBlog> {
    const newInstance = await this.BlogRepository.findOneBy({ id: id });
    return newInstance;
  }
  async update(id: number, body: IBlog): Promise<UpdateResult> {
    const response = await this.BlogRepository.update(id, body);
    return response;
  }
  async delete(id: number): Promise<DeleteResult> {
    const newInstance = await this.BlogRepository.delete({ id: id });
    return newInstance;
  }
}
