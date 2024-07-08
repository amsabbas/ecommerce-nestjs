import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { DecimalColumnTransformer } from 'src/base/utils/decimal.utils';
import { OrderItem } from 'src/order/model/order.item.entity';

@Entity("OrderProducts")
export class OrderProduct {
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

  @OneToMany(() => OrderItem, order => order.product, { eager: false })
  orderItem: OrderItem;
}
