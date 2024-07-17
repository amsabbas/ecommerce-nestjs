import {
    Controller,
    Get,
    Post,Request, UseGuards,
    Query,
    Body,
    Res
  } from "@nestjs/common";
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { Order } from "../model/order.entity";
import { OrdersService } from "../service/order.service";
import { Roles } from './../../auth/model/roles.decorator';
import { Role } from './../../auth/model/role.enum';
import { RolesGuard } from './../../auth/model/roles.guard';
import { PageOptionsDto } from "src/base/pagination/page.options.dto";
import { PageDto } from "src/base/pagination/page.dto";
import { OrderPromoDTO } from "../model/order.promo.dto";
import { OrderStatusDTO } from "../model/order.status.dto";

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrdersService) {}
  
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get('getAllOrders')
    @Roles(Role.Admin)
    getAllOrders(
      @Request() { user }: Req,
      @Query() pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<Order>> {
      return this.orderService.getAllOrders(pageOptionsDto);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get('getRecentOrders')
    @Roles(Role.Admin)
    getRecentOrders(
      @Request() { user }: Req,
    ): Promise<Order[]> {
      return this.orderService.getRecentOrders();
    }

    @UseGuards(JwtAuthGuard)
    @Get('getMyOrders')
    getMyOrders(@Request() { user }: Req,): Promise<Order[]> {
      return this.orderService.getMyOrders(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('createOrder')
    createOrder(@Request() { user }: Req, @Body() promo?: OrderPromoDTO): Promise<Order> {
      return this.orderService.createOrder(user.userId,promo.promoCode);
    }    

    @UseGuards(JwtAuthGuard)
    @Post('createOnlineOrder')
    createOnlineOrder(@Request() { user }: Req, @Body() promo?: OrderPromoDTO): Promise<string> {
      return this.orderService.createOnlineOrder(user.userId,promo.promoCode);
    }    

    @Get('paySuccess')
    async paySuccess(@Query('token') token: string,@Query('promo') promo?: string) : Promise<void> {
      return this.orderService.paySuccess(token ,promo);
    }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin)
    @Post('changeOrderStatus')
    changeOrderStatus(@Request() { user }: Req,@Body() orderStatus:OrderStatusDTO): Promise<Order> {
      return this.orderService.changeOrderStatus(user.userId ,orderStatus.order_id,orderStatus.status);
    }  
}
  