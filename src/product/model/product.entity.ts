import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { Category } from 'src/category/model/category.entity';
import { DecimalColumnTransformer } from 'src/base/utils/decimal.utils';
import { Cart } from 'src/cart/model/cart.entity';

@Entity("Products")
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column()
  name_ar: string;

  @IsNotEmpty()
  @Column()
  description: string;

  @IsNotEmpty()
  @Column()
  description_ar: string;

  @IsNotEmpty()
  @Column()
  photo_url: string;

  @IsNotEmpty()
  @Column('float', {
    transformer: new DecimalColumnTransformer(),
})
  price: number;

  @IsNotEmpty()
  @Column()
  is_available: boolean;

  @IsNotEmpty()
  @Column()
  quantity: number;

  @IsNotEmpty()
  @Column()
  category_id: number;

  @ManyToOne(() => Category, category => category.product, { eager: true, })
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Category;

  @OneToMany(() => Cart, cart => cart.product, { eager: false })
  cart: Cart;
}
