import {
    Controller,
    Get,
    Query,
    Request, UseGuards,
  } from "@nestjs/common";
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { CheckoutService } from "../service/checkout.service";
import { Cost } from "../model/cost.entity";

@UseGuards(JwtAuthGuard)
@Controller('checkout')
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService) {}
  
    @Get('cost')
    calculateCost(@Request() { user }: Req, @Query('promoCode') promo?: string): Promise<Cost> {
      return this.checkoutService.calculateCost(user.userId,promo);
    }

    @Get('checkCartAvailability')
    checkCartAvailability(@Request() { user }: Req): Promise<void> {
      return this.checkoutService.checkCartAvailability(user.userId);
    }
  
}
  