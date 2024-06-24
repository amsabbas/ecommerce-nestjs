import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { User } from "src/user/model/user.entity";
import { Order } from "src/order/model/order.entity";
import { DashboardData } from "../model/dashboard.data";
import * as moment from "moment";

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}


  async getData(): Promise<DashboardData> {
    const totalOrders = await this.orderRepository.count();
    const totalUsers = await this.userRepository.count();

    const start = moment().startOf('day').toDate();
    const end = moment().endOf('day').toDate();

    console.log('start' + start + " end "+ end);

    const todayOrders = await this.orderRepository.count({
      where: { 
          order_date:  Between(start,end) 
      },
   });
    const data = new DashboardData();
    data.totalOrders = totalOrders;
    data.totalUsers = totalUsers;
    data.todayOrders = todayOrders
    return data;
  }

  

  
}
