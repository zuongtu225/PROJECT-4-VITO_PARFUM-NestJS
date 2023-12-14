import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository, UpdateResult } from 'typeorm';
import { IProduct } from './interface/Product.interface';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';
import { ISearch } from '../user/interface/user.interface';
@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(body: ProductDto): Promise<IProduct> {
    return await this.productRepository.save(body);
  }
  async findAll(data: ISearch): Promise<ProductDto[]> {
    return await this.productRepository.find({
      where: data.data && { title: ILike(`%${data.data}%`) },
      order: {
        id: 'DESC',
      },
    });
  }
  async findOne(id: number): Promise<IProduct> {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['productSizes', 'category', 'brand', 'images'],
    });
  }
  async updateProduct(id: number, body: IProduct): Promise<UpdateResult> {
    return await this.productRepository.update(id, body);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}
