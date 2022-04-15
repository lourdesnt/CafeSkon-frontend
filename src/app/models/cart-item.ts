import { Product } from './product';
import { User } from './user';
export class CartItem {
    id: any;
    quantity: number;
    price: number;
    product: Product;
    customer: User;

    constructor(){
        this.quantity=0;
        this.price=0.00;
    }
}
