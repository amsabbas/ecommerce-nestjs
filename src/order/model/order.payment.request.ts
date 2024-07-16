import { OrderPaymentBilling } from "./order.payment.billing";
import { OrderPaymentItems } from "./order.payment.items";

export class OrderPaymentRequest {  
    amount : number
    currency : string
    redirection_url: string
    items: OrderPaymentItems[]
    billing_data: OrderPaymentBilling
    payment_methods : (string | number)[]
    constructor( amount:number, currency:string,redirectionUrl:string,items:OrderPaymentItems[],
        billingData:OrderPaymentBilling, paymentMethods:(string | number)[]){
        this.amount = amount;
        this.currency = currency;
        this.redirection_url = redirectionUrl;
        this.items = items;
        this.billing_data = billingData,
        this.payment_methods = paymentMethods;
    }
}
  