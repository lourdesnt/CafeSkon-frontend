import { Review } from "./review";

export enum Category {
    CAKE = 'CAKE',
    COOKIE = 'COOKIE',
    DRINK = 'DRINK',
    COFFEE = 'COFFEE'
}

export class Product {
    id: any;
    name: string;
    description: string;
    price: number;
    image: string;
    reviews: Review[];
    category: Category;

    constructor(){
        this.id = 0;
        this.name = '';
        this.description = '';
        this.price = 0.00;
        this.image = '';
        this.reviews = [];
        this.category = Category.CAKE;
    }
}
