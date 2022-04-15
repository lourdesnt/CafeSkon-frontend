import { Review } from "./review";

export class Product {
    id: any;
    name: string;
    description: string;
    price: number;
    image: string;
    reviews: Review[];
    category: any;

    constructor(){
        this.name = '';
        this.description = '';
        this.price = 0.00;
        this.image = '';
        this.reviews = [];
        this.category = '';
    }
}
