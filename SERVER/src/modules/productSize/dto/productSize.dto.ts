import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { IProduct } from 'src/modules/product/interface/Product.interface';
import { ISize } from 'src/modules/size/interface/size.interface';
//validate data request and response
export class ProductSizeDto {
  @IsNumber()
  @IsNotEmpty()
  productId: IProduct;

  @IsArray()
  @IsNotEmpty()
  sizeId: ISize[];
}
