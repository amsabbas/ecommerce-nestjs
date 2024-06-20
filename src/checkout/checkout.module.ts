import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '.././user/model/user.entity';
import { Cart } from 'src/cart/model/cart.entity';
import { CheckoutController } from './controller/checkout.controller';
import { CheckoutService } from './service/checkout.service';
import { Promo } from 'src/promo/model/promo.entity';

@Module({
imports: [TypeOrmModule.forFeature([Cart]),
TypeOrmModule.forFeature([Promo]),
   TypeOrmModule.forFeature([User])],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [TypeOrmModule],
})
export class CheckoutModule {}
