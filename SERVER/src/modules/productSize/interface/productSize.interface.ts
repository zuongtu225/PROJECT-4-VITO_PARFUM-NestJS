import { IProduct } from 'src/modules/product/interface/Product.interface';
import { ISize } from 'src/modules/size/interface/size.interface';

export class IProductSize {
  productId: IProduct;
  sizeId: ISize;
}
