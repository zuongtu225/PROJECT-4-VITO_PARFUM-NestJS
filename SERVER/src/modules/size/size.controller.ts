import { SizeService } from './size.service';
import * as dotenv from 'dotenv';
import { ISize } from './interface/size.interface';
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
} from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { AuthenGuard } from 'src/shared/guards/authen.guard';
import { AuthorGuard } from 'src/shared/guards/author.guard';

dotenv.config();
const init = process.env.API_URL;

@Controller(`${init}/sizes`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthorGuard)
@UseGuards(AuthenGuard)
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  async createSize(@Body() body: ISize): Promise<any> {
    return await this.sizeService.createSizeService(body);
  }
  @Get()
  async getAllSizes(): Promise<ISize[]> {
    return await this.sizeService.getAllSizeService();
  }

  @Get('/:id')
  async getDetailSize(@Param('id') id: number): Promise<ISize | IResponse> {
    return await this.sizeService.getDetailSize(id);
  }

  @Put('/:id')
  async updateSize(@Param('id') id: number, @Body() body): Promise<IResponse> {
    return await this.sizeService.updateSizeService(id, body);
  }

  @Delete('/:id')
  async deleteSize(@Param('id') id: number): Promise<IResponse> {
    return await this.sizeService.deleteSizeService(id);
  }
}
