import { BadRequestException,Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "src/cart/model/cart.entity";
import { Cost } from "../model/cost.entity";
import { Constants } from "src/base/model/constants";
import { Promo } from "src/promo/model/promo.entity";

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Promo)
    private promoRepository: Repository<Promo>,
  ) {}


  async calculateCost(userId:number,promoCode?:String): Promise<Cost> {
    const carts = await this.cartRepository.find({
      where: {user_id : userId}
      }
    );

    let sum = 0
    carts.map(cart => sum += (cart.product.price * cart.quantity))

    const cost = new Cost();
    cost.subtotal = sum ;
    cost.deliveryFees = Constants.deliveryFees
    cost.discount = 0
    if (promoCode != null && promoCode != ""){
       const promo = await this.promoRepository.findOne({
         where: {promo_code : promoCode.toString() }
         }
       );
       if (promo != null){
        cost.discount = promo.discount_value
       }else{
        throw new BadRequestException([
           "Promo not found",
        ]);
       }
    }

    cost.total =   cost.subtotal + cost.deliveryFees - cost.discount;
    if (cost.total < 0)
      cost.total = 0

    return cost
  }

  async checkCartAvailability(userId:number): Promise<void> {

    const carts = await this.cartRepository.find({
      where: {user_id : userId}
      }
    );

    carts.map(cart => { if (cart.quantity > cart.product.quantity) 
      throw new BadRequestException([
        cart.product.name + " not available",
      ]);
      }
    );
  }
}
