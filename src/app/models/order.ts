import { Cart } from "./cart";

export class Order {
    id: any;
    cart: Cart;
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
