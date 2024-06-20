import {
    Body,
    Controller,
    Get,
    Param, Post,   Request, UseGuards,Delete
  } from "@nestjs/common";
import { JwtAuthGuard } from './../../auth/model/jwt-auth.guard';
import { Req } from './../../auth/model/request-user';
import { CartService } from "../service/cart.service";
import { Cart } from "../model/cart.entity";

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
  
    @Get('getMyCart')
    getMyCart(@Request() { user }: Req,): Promise<Cart[]> {
      return this.cartService.getMyCart(user.userId);
    }

    @Delete(':id')
    deleteById(@Request() { user }: Req,@Param('id') id: number): Promise<boolean> {
     return this.cartService.remove(id,user.userId);
    }

    @Post('addToMyCart')
    addToMyCart(@Request() { user }: Req, @Body() cart: Cart): Promise<void> {
      return this.cartService.addToMyCart(user.userId,cart);
    }

    @Post('clearCart')
    clearCart(@Request() { user }: Req): Promise<boolean> {
    return this.cartService.clearCart(user.userId);
    }

    @Get('cartCount')
    getCartCount(@Request() { user }: Req,): Promise<number> {
      return this.cartService.getCartCount(user.userId);
    }

}
  