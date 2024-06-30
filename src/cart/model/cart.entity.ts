import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { Product } from 'src/product/model/product.entity';

@Entity("Cart")
export class Cart {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  product_id: number;

  @Column()
  user_id: number;

  @IsNotEmpty()
  @Column()
  quantity: number;

  @ManyToOne(() => Product, product => product.cart, { eager: true })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;
}
