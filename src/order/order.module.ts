import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '.././user/model/user.entity';
import { OrderController } from './controller/order.controller';
import { OrdersService } from './service/order.service';
import { Order } from './model/order.entity';
import { Cart } from 'src/cart/model/cart.entity';
import { OrderItem } from './model/order.item.entity';
import { CartService } from 'src/cart/service/cart.service';
import { CheckoutService } from 'src/checkout/service/checkout.service';
import { Promo } from 'src/promo/model/promo.entity';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { OrderProduct } from './model/order.product.entity';
import { ProductService } from 'src/product/service/product.service';
import { Product } from 'src/product/model/product.entity';
import { UserService } from 'src/user/service/user.service';
import { UserToken } from 'src/user/model/user.token.entity';
import { AuthService } from 'src/auth/service/auth.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
imports: [
   FirebaseModule,
   HttpModule,
   AuthModule,
   TypeOrmModule.forFeature([Order]),
   TypeOrmModule.forFeature([Promo]),
   TypeOrmModule.forFeature([OrderItem]),
   TypeOrmModule.forFeature([OrderProduct]),
   TypeOrmModule.forFeature([User]),
   TypeOrmModule.forFeature([UserToken]),
   TypeOrmModule.forFeature([Product]),
   TypeOrmModule.forFeature([Cart])],
  controllers: [OrderController],
  providers: [OrdersService,CartService,CheckoutService,ProductService,UserService,AuthService],
  exports: [TypeOrmModule],
})
export class OrderModule {}
