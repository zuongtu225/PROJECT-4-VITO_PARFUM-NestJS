import { AuthenModule } from './modules/auth/authen.module';
import { CategoryModule } from './modules/category/category.module';
import { MysqlModule } from './modules/database/ormConfig';
import { Module } from '@nestjs/common';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { SizeModule } from './modules/size/size.module';
import { ProductModule } from './modules/product/product.module';
import { ProductSizeModule } from './modules/productSize/productSize.module';
import { BrandModule } from './modules/brand/brand.module';
import { ImageModule } from './modules/images/image.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderItemModule } from './modules/orderItem/orderItem.module';
import { OrderModule } from './modules/order/order.module';
import { AddressModule } from './modules/address/address.module';
import { PaymentModule } from './modules/payment/payment.module';
import { GoogleStrategyModule } from './shared/utils/auth-google/auth-google.module';
import { SocketGateway } from './socket';
@Module({
  imports: [
    MysqlModule,
    AuthenModule,
    CategoryModule,
    RoleModule,
    UserModule,
    SizeModule,
    ProductModule,
    ProductSizeModule,
    BrandModule,
    ImageModule,
    CartModule,
    OrderItemModule,
    OrderModule,
    AddressModule,
    PaymentModule,
    GoogleStrategyModule,
    SocketGateway,
  ],
})
export class AppModule {}
