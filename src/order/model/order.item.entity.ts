import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from '@nestjs/class-validator';
import { Order } from './order.entity';
import { OrderProduct } from './order.product.entity';

@Entity("OrderItems")
export class OrderItem {
  @PrimaryGeneratedColumn()
  id?: number;

  @IsNotEmpty()
  @Column()
  order_id: number;

  @IsNotEmpty()
  @Column()
  product_id: number;

  @IsNotEmpty()
  @Column()
  quantity: number;

  @ManyToOne(() => OrderProduct, product => product.orderItem, { eager: true })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: OrderProduct;

  @ManyToOne(() => Order, order => order.orderItem, { eager: false })
  @JoinColumn([{ name: "order_id", referencedColumnName: "id" }])
  order: Order;
}