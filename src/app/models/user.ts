import { Order } from "./order";

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export class User {
    id?: any;
    username: string;
    email: string;
    password: string;
    role: Role;

    constructor(){
        this.username='';
        this.email='';
        this.password='';
        this.role=Role.USER;
    }
}