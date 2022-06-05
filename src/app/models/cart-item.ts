import { Order } from './order';
import { Product } from './product';

//Modelo para productos del carrito
export class CartItem {
    order: Order;
    product: Product;
    quantity: number;

    constructor(){
        this.quantity=1;
    }
}
