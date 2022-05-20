export class OrderDto {
    id?: any;
    customerId: string;
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    phone: string;
    payment: string;
    orderDate: Date;
    productMap: any;

    constructor(){
        this.firstName = "";
        this.lastName = "";
        this.address = "";
        this.postalCode = "";
        this.phone = "";
        this.payment = "";
        this.orderDate = new Date();
        this.productMap = {};
    }
}
