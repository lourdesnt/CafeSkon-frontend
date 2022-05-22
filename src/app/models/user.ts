import { Order } from "./order";

enum Role {
    USER,
    ADMIN
}

export class User {
    id: any;
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