import { Module } from '@nestjs/common';
import { AdsController } from './controller/ads.controller';
import { AdsService } from './service/ads.service';
import { Ads } from './model/ads.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
imports: [TypeOrmModule.forFeature([Ads])],
  controllers: [AdsController],
  providers: [AdsService],
  exports: [TypeOrmModule],
})
export class AdsModule {}
