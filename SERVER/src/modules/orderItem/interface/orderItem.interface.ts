import { Order } from 'src/modules/order/entities/order.entity';
import { ProductSize } from 'src/modules/productSize/entities/productSize.entity';

export class IOrderItem {
  codeOrder: Order;
  quantity: number;
  productSizeId: ProductSize;
}
