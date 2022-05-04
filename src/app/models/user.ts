import { Order } from "./order";

export class User {
    id: any;
    username: string;
    email: string;
    password: string;
    role: any;
    orders: Order[] = [];

    constructor(){
        this.username='';
        this.email='';
        this.password='';
        this.role='';
    }
}