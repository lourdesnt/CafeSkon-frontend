import { CartItem } from "./cart-item";
import { User } from "./user";

export class Order {
    id?: any;
    customer: User;
    //items: CartItem[];
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    phone: string;
    payment: string;
    orderDate: Date;

    constructor(){
        //this.items = [];
        this.firstName = '';
        this.lastName = '';
        this.address = '';
        this.postalCode = '';
        this.phone = '';
        this.payment = '';
        this.orderDate = new Date();
    }
}
