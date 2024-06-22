import { Order } from "./order.entity";

export class OrderResponse {
    subtotal: number;
    deliveryFees: number;
    discount: number;
    total : number
    orders : Order[]
}