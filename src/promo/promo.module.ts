import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '.././user/model/user.entity';
import { Promo } from './model/promo.entity';
import { PromoController } from './controller/promo.controller';
import { PromoService } from './service/promo.service';

@Module({
imports: [TypeOrmModule.forFeature([Promo]),
   TypeOrmModule.forFeature([User])],
  controllers: [PromoController],
  providers: [PromoService],
  exports: [TypeOrmModule],
})
export class PromoModule {}
