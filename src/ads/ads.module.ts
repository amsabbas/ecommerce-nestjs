import { Module } from '@nestjs/common';
import { AdsController } from './controller/ads.controller';
import { AdsService } from './service/ads.service';
import { Ads } from './model/ads.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '.././user/model/user.entity';

@Module({
imports: [TypeOrmModule.forFeature([Ads]),
   TypeOrmModule.forFeature([User])],
  controllers: [AdsController],
  providers: [AdsService],
  exports: [TypeOrmModule],
})
export class AdsModule {}
