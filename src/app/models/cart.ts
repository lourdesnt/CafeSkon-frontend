import { CartItem } from "./cart-item";

export class Cart {
    id: any;
    items: CartItem[];

    constructor(){
        this.items=[];
    }
}
