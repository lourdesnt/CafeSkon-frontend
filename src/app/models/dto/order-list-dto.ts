import { Order } from "../order";

export class OrderListDto {
    id?: any;
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    phone: string;
    payment: string;
    orderDate: Date;
    productMap: Map<string, number>;

    constructor(order: Order, productMap: Map<string, number>){
        this.id = order.id;
        this.firstName = order.firstName;
        this.lastName = order.lastName;
        this.address = order.address;
        this.postalCode = order.postalCode;
        this.phone = order.phone;
        this.payment = order.payment;
        this.orderDate = order.orderDate;
        this.productMap = productMap;
    }
}