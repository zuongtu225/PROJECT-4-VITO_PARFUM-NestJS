import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Image } from './entities/image.entity';
import { Iimage } from './interface/image.interface';
@Injectable()
export class ImageRepository {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}
  async create(body: Iimage): Promise<any> {
    return await this.imageRepository.save(body);
  }
  async findAll(): Promise<Iimage[]> {
    return await this.imageRepository.find({
      relations: ['productId'],
    });
  }
  async findOne(id: number): Promise<Iimage> {
    return await this.imageRepository.findOneBy({ id });
  }
  async updateImage(id: number, url: Iimage): Promise<any> {
    return await this.imageRepository.update(id, url);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.imageRepository.delete(id);
  }
}
