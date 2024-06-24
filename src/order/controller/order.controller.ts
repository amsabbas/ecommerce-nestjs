import {
    Body,
    Controller,
    Get,
    Param, Post,   Request, UseGuards,Delete,
    Query
  } from "@nestjs/common";
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { Order } from "../model/order.entity";
import { OrdersService } from "../service/order.service";
import { OrderResponse } from "../model/order.response";
import { Roles } from './../../auth/model/roles.decorator';
import { Role } from './../../auth/model/role.enum';
import { RolesGuard } from './../../auth/model/roles.guard';


@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrdersService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get('getAllOrders')
    getAllOrders(@Request() { user }: Req,): Promise<OrderResponse> {
      return this.orderService.getAllOrders(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('createOrder')
    createOrder(@Request() { user }: Req,): Promise<Order> {
      return this.orderService.createOrder(user.userId);
    }    

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin)
    @Post('changeOrderStatus')
    changeOrderStatus(@Request() { user }: Req,@Query('order_id') orderID: number, @Query('status') status: string,): Promise<Order> {
      return this.orderService.changeOrderStatus(orderID,status);
    }  

}
  