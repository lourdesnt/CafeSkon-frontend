import { Product } from "./product";

export class Review {
    id?: any;
    username: string;
    comment: string;
    rating: number;

    constructor(){
        this.username='Anonymous';
        this.comment='';
        this.rating=0;
    }
}
