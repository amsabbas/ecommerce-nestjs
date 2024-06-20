import { BadRequestException,Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../user/model/user.entity";
import { Cart } from "../model/cart.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getMyCart(userId:number): Promise<Cart[]> {
    return await this.cartRepository.find({
        where: {user_id : userId}
      }
    );
  }

  async addToMyCart(id: number,cart: Cart): Promise<void> {

    const product = await this.cartRepository.findOne({
      where:{product_id:cart.product_id,user_id : cart.user_id}
    });

    if (product) {
      product.quantity = cart.quantity
      await this.cartRepository.save(product);
    }else{
     await this.cartRepository.save(cart);
    }
  }


  async remove(id: number,userId:number): Promise<boolean> {
   const result = await this.cartRepository.delete(id);
   return result.affected > 0
  }

  async clearCart(userId:number): Promise<boolean> {

    const result = await this.cartRepository.delete({
        user_id:userId
      });
    return result.affected > 0
    }

    async getCartCount(userId:number): Promise<number> {
      
      const cart = await this.cartRepository.find({
        where: {user_id : userId}
        }
      );
      let sum = 0
      cart.map(cart => sum += cart.quantity)
      return sum
    }
}
