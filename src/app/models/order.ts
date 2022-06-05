import { CartItem } from "./cart-item";
import { User } from "./user";

//Modelo para pedidos
export class Order {
    id?: any;
    customer: User;
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    phone: string;
    payment: string;
    orderDate: Date;

    constructor(){
        this.firstName = '';
        this.lastName = '';
        this.address = '';
        this.postalCode = '';
        this.phone = '';
        this.payment = '';
        this.orderDate = new Date();
    }
}
