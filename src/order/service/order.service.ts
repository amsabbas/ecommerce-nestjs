import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { Order } from "../model/order.entity";
import { OrderItem } from "../model/order.item.entity";
import { CartService } from "src/cart/service/cart.service";
import { PageOptionsDto } from "src/base/pagination/page.options.dto";
import { PageDto } from "src/base/pagination/page.dto";
import { PageMetaDto } from "src/base/pagination/page.meta.dto";
import { CheckoutService } from "src/checkout/service/checkout.service";
import { FirebaseService } from "src/firebase/firebase.repository";
import { OrderProduct } from "../model/order.product.entity";
import { User } from "src/user/model/user.entity";
import { Address } from "src/address/model/address.entity";
import { ProductService } from "src/product/service/product.service";
import { UserService } from "src/user/service/user.service";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
    private readonly cartService: CartService,
    private readonly checkoutService: CheckoutService,
    private readonly productService: ProductService,
    private firebaseSerivce: FirebaseService,
    private userService : UserService
  ) {}

  async getMyOrders(userId:number): Promise<Order[]> {
    const orders = await this.orderRepository.find({where:{user_id:userId},
      order: {
        order_date: "DESC" 
    }});
    return orders;
  }

  async getRecentOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      take : 5,
      order: {
        order_date: "DESC" 
    }});
    return orders;
  }

  async getAllOrders(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Order>> {

    const queryBuilder = this.orderRepository.createQueryBuilder("Orders");
    queryBuilder
      .orderBy("Orders.order_date", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .leftJoinAndMapMany("Orders.info",OrderItem,"OrderItem","OrderItem.order_id = Orders.id")
      .leftJoinAndMapMany("Orders.products",OrderProduct,"OrderProducts","OrderProducts.id = OrderItem.product_id")
      .leftJoinAndMapOne("Orders.user",User,"Users","Users.id = Orders.user_id")
      .leftJoinAndMapOne("Orders.user_address",Address,"Addresses","Addresses.user_id = Orders.user_id and Addresses.is_primary = true");

    const itemCount = await queryBuilder.getCount();
    const { entities  } = await queryBuilder.getRawAndEntities();

    entities.forEach((entity) => {
      let cloneObject = { ... entity.user };
      cloneObject.password = "---"
      entity.user = cloneObject
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    
    return new PageDto(entities, pageMetaDto);
  }

  async createOrder(userId:number,promoCode?:String): Promise<Order> {

    const carts = await this.cartService.getMyCart(userId)
    if (carts.length <= 0) {
      throw new BadRequestException('Cart is empty');
    }

    const costModel = await this.checkoutService.calculateCost(userId,promoCode);

    const order = new Order()
    order.status = "pending"
    order.user_id = userId;
    order.discount = costModel.discount;
    order.deliveryFees = costModel.deliveryFees;
    order.subtotal = costModel.subtotal;
    order.total = costModel.total;

    const inserted = await this.orderRepository.save(order);
    const savedOrder = await this.findById(inserted.id); 
    
    for await (const cart of carts){
      const insertedProduct =  await this.orderProductRepository.save(cart.product);
      const orderItem = new OrderItem()
      orderItem.order_id = inserted.id
      orderItem.product_id = insertedProduct.id
      orderItem.quantity = cart.quantity
      await this.orderItemRepository.save(orderItem); 
      await this.productService.editQuantity(cart.product_id,cart.product.quantity-cart.quantity)
    }
  
    await this.cartService.clearCart(userId)

    await this.firebaseSerivce.addOrder(inserted.id)



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

  async changeOrderStatus(userID : number, orderID:number,status:string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {id : orderID}
    });
    order.status = status;
    const updated = this.orderRepository.save(order);
    const token = await this.userService.findTokenById(userID);
    await this.firebaseSerivce.sendingNotificationOneUser(token,"Your order has been changed",status.toLocaleUpperCase());
    return updated
  }
  
}
