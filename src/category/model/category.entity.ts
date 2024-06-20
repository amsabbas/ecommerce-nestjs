import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { Product } from 'src/product/model/product.entity';

@Entity("Categories")
export class Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @OneToMany(() => Product, product => product.category, { eager: false })
  product: Product;
}
