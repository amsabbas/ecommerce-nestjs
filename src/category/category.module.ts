import { Module } from '@nestjs/common';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './model/category.entity';
import { Product } from 'src/product/model/product.entity';

@Module({
imports: [
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Product])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [TypeOrmModule],
})
export class CategoryModule {}
