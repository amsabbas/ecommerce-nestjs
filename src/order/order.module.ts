import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '.././user/model/user.entity';
import { OrderController } from './controller/order.controller';
import { OrdersService } from './service/order.service';
import { Order } from './model/order.entity';
import { Cart } from 'src/cart/model/cart.entity';
import { OrderItem } from './model/order.item.entity';
import { CartService } from 'src/cart/service/cart.service';

@Module({
imports: [
   TypeOrmModule.forFeature([Order]),
   TypeOrmModule.forFeature([OrderItem]),
   TypeOrmModule.forFeature([User]),
   TypeOrmModule.forFeature([Cart])],
  controllers: [OrderController],
  providers: [OrdersService,CartService],
  exports: [TypeOrmModule],
})
export class OrderModule {}
