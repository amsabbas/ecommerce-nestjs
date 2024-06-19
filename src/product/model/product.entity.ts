import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { Category } from 'src/category/model/category.entity';
import { DecimalColumnTransformer } from 'src/base/utils/decimal.utils';

@Entity("Products")
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @IsNotEmpty()
  @Column()
  description: string;

  @IsNotEmpty()
  @Column()
  photo_url: string;

  @IsNotEmpty()
  @Column('decimal', {
    precision: 6, scale: 2 ,
    transformer: new DecimalColumnTransformer(),
})
  price: number;

  @IsNotEmpty()
  @Column()
  isAvailable: boolean;

  @IsNotEmpty()
  @Column()
  quantity: number;

  @ManyToOne(() => Category)
  @JoinColumn()
  category_id: Category;
}
