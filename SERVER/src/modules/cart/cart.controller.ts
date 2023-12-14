import { CartService } from './cart.service';
import * as dotenv from 'dotenv';
import { ICart } from './interface/cart.interface';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Post,
  Delete,
  Request,
} from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { AuthorGuard } from 'src/shared/guards/author.guard';
import { IUser } from '../user/interface/user.interface';
import { CurrentUser } from '../user/decorator/currentUser.decorator';
import { Cart } from './entities/cart.entity';

dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/carts`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthenGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(@CurrentUser() user, @Body() body: ICart): Promise<any> {
    return await this.cartService.createCartService(user.id, body);
  }

  @Get()
  async getAllCarts(): Promise<Cart[]> {
    return await this.cartService.getAllCartService();
  }
  @Get('/detail')
  async getCartByUser(@CurrentUser() user): Promise<ICart[] | IResponse> {
    return await this.cartService.getDetailCart(user.id);
  }

  @Put('/:id')
  async updateCart(@Param('id') id: number, @Body() body): Promise<any> {
    return await this.cartService.updateCartService(id, body);
  }

  @Delete('/delete')
  async deleteCart(@CurrentUser() user): Promise<IResponse> {
    return await this.cartService.deleteCartService(user.id);
  }
  @Delete('/:id')
  async deleteCartItem(@Param('id') id: number): Promise<IResponse> {
    return await this.cartService.deleteCartItem(+id);
  }
}
