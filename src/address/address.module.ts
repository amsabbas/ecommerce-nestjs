import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '.././user/model/user.entity';
import { Address } from './model/address.entity';
import { AddressController } from './controller/address.controller';
import { AddressService } from './service/address.service';
import { Area } from './model/area.entity';

@Module({
imports: [
  TypeOrmModule.forFeature([Address]),
  TypeOrmModule.forFeature([Area]),
  TypeOrmModule.forFeature([User])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [TypeOrmModule],
})
export class AddressModule {}
