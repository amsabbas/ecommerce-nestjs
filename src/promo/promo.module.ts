import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promo } from './model/promo.entity';
import { PromoController } from './controller/promo.controller';
import { PromoService } from './service/promo.service';

@Module({
imports: [TypeOrmModule.forFeature([Promo])],
  controllers: [PromoController],
  providers: [PromoService],
  exports: [TypeOrmModule],
})
export class PromoModule {}
