import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '.././user/model/user.entity';
import { Cart } from './model/cart.entity';
import { CartController } from './controller/cart.controller';
import { CartService } from './service/cart.service';

@Module({
imports: [TypeOrmModule.forFeature([Cart]),
   TypeOrmModule.forFeature([User])],
  controllers: [CartController],
  providers: [CartService],
  exports: [TypeOrmModule],
})
export class CartModule {}
