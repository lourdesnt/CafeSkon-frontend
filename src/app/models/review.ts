import { Product } from "./product";

export class Review {
    id?: any;
    username: string;
    comment: string;
    product: Product;
    rating: number;

    constructor(){
        this.comment='';
        this.rating=0;
    }
}
