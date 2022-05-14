import { Order } from './order';
import { Product } from './product';
export class CartItem {
    order: Order;
    product: Product;
    quantity: number;

    constructor(){
        this.quantity=1;
    }
}
