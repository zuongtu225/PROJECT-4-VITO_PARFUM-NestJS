import { AddressService } from './address.service';
import * as dotenv from 'dotenv';
import { IAddress } from './interface/addess.interface';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { CurrentUser } from '../user/decorator/currentUser.decorator';
import { Address } from './entities/address.entity';

dotenv.config();
const init = process.env.API_URL;
@Controller(`${init}/address`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthenGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @Post()
  async createAddress(
    @CurrentUser() user,
    @Body() body: IAddress,
  ): Promise<IResponse | Address> {
    return await this.addressService.createAddressService(user.id, body);
  }
  @Put('/:id')
  async updateAddress(
    @Param('id') id: number,
    @Body() body,
  ): Promise<IResponse> {
    return await this.addressService.updateAddressService(id, body);
  }
  @Delete('/:id')
  async deleteAddress(@Param('id') id: number): Promise<IResponse> {
    return await this.addressService.deleteAddress(id);
  }
}
