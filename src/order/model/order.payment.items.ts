export class OrderPaymentItems {  
    name: string
    amount : number
    description : string
    quantity: number
    constructor(name:string, amount:number, description:string,quantity:number){
        this.name = name;
        this.amount = amount;
        this.description = name;
        this.quantity = quantity;
    }
}