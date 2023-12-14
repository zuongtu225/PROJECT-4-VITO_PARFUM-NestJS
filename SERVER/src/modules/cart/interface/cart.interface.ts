import { IProductSize } from 'src/modules/productSize/interface/productSize.interface';

export class ICart {
  quantity: number;
  productSizeId: IProductSize;
}
