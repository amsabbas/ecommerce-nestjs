import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { User } from 'src/user/model/user.entity';
import { Product } from 'src/product/model/product.entity';

@Entity("Cart")
export class Cart {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  product_id: number;

  @IsNotEmpty()
  @Column()
  user_id: number;

  @IsNotEmpty()
  @Column()
  quantity: number;


  @ManyToMany(() => Product)
  @JoinColumn()
  product : Product;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
