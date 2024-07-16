export class OrderPaymentBilling {  
    email: string
    phone_number : string
    first_name : string
    last_name: string
    constructor(email:string, phone:string, name:string){
        this.email = email;
        this.phone_number = phone;
        this.first_name = name;
        this.last_name = "-";
    }
}