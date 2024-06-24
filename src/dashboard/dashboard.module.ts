import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './service/dashboard.service';
import { UserService } from 'src/user/service/user.service';
import { OrdersService } from 'src/order/service/order.service';
import { User } from 'src/user/model/user.entity';
import { Order } from 'src/order/model/order.entity';
import { DashboardController } from './controller/dashboard.controller';


@Module({
imports: [TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Order])],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [TypeOrmModule],
})
export class DashboardModule {}
