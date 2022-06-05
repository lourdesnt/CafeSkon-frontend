import { Order } from "./order";

//Enumerado para roles de usuarios
export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

//Modelo para usuarios
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