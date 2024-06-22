import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Order } from "../model/order.entity";
import { OrderItem } from "../model/order.item.entity";
import { CartService } from "src/cart/service/cart.service";
import { OrderResponse } from "../model/order.response";
import { CheckoutService } from "src/checkout/service/checkout.service";
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private readonly cartService: CartService,
  ) {}

  async getAllOrders(userId:number): Promise<OrderResponse> {
    const orders = await this.orderRepository.find({where:{user_id:userId}});
    const result = new OrderResponse()
    result.orders = orders;
    return result;
  }

  async createOrder(userId:number): Promise<Order> {

    const carts = await this.cartService.getMyCart(userId)
    if (carts.length <= 0) {
      throw new BadRequestException('Cart is empty');
    }

    const order = new Order()
    order.status = "pending"
    order.user_id = userId;

    const inserted = await this.orderRepository.save(order);
    const savedOrder = await this.findById(inserted.id); 
    
    for await (const cart of carts){
      const orderItem = new OrderItem()
      orderItem.order_id = inserted.id
      orderItem.product_id = cart.product_id
      orderItem.quantity = cart.quantity
      await this.orderItemRepository.save(orderItem);
    }
  
    await this.cartService.clearCart(userId)

    return savedOrder
  }

  async findById(id: number): Promise<Order> {
    const product = await this.orderRepository.findOne({
      where:{id:id}
    });

    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async changeOrderStatus(userId:number,orderID:number,status:string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {id : orderID}
    });
    order.status = status;
    const updated = this.orderRepository.save(order);
    return updated
  }
  
}
