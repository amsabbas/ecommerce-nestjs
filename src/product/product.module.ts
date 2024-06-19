import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '.././user/model/user.entity';
import { Product } from './model/product.entity';
import { ProductController } from './controller/product.controller';
import { ProductService } from './service/product.service';

@Module({
imports: [TypeOrmModule.forFeature([Product]),
   TypeOrmModule.forFeature([User])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule],
})
export class ProductModule {}
