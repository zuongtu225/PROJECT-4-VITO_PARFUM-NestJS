import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IAddress } from './interface/addess.interface';
import { Address } from './entities/address.entity';
@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}
  async create(body: IAddress): Promise<Address> {
    return await this.addressRepository.save(body);
  }
  async updateAddress(id: number, body: IAddress): Promise<UpdateResult> {
    return await this.addressRepository.update(id, body);
  }
  async deleteCategory(id: number): Promise<DeleteResult> {
    return await this.addressRepository.delete(id);
  }
}
