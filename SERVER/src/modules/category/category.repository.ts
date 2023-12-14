import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { Category } from './entities/category.entity';
import { ICategory } from './interface/category.interface';
import { ISearch } from '../user/interface/user.interface';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(body: ICategory): Promise<ICategory> {
    return await this.categoryRepository.save(body);
  }
  async findAll(data: ISearch): Promise<ICategory[]> {
    return await this.categoryRepository.find({
      where: data.data && { title: ILike(`%${data.data}%`) },
    });
  }
  async findOne(id: number): Promise<ICategory> {
    return await this.categoryRepository.findOneBy({ id });
  }
  async updateCategory(id: number, body: ICategory): Promise<UpdateResult> {
    return await this.categoryRepository.update(id, body);
  }
  async deleteCategory(id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}
