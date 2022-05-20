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
    productMap: Map<string, string>;

}
