import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'app/models/cart';
import { CartItem } from 'app/models/cart-item';
import { Product } from 'app/models/product';
import { User } from 'app/models/user';
import { CartItemService } from 'app/services/cart-item.service';
import { CartService } from 'app/services/cart.service';
import { ProductService } from 'app/services/product.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public productChosen: Product;
  public username: string;
  public myCart: Cart;
  public user: User;
  public id: any;
  public item: CartItem;

  constructor(private productService: ProductService,
              private userService: UserService,
              private cartItemService: CartItemService,
              private cartService: CartService,
              private _route: ActivatedRoute,
              private router: Router) { 
                this.productChosen = new Product();
                this.id = this._route.snapshot.paramMap.get('id');
                //this.username = localStorage.get("username");
                // this.userService.getUser(this.username).subscribe(
                //   (data) => {
                //     this.user = data;
                //   },
                //   (error: Error) => {
                //     console.error("Error getting actual user");
                //   });
              }

  ngOnInit(): void {
    this.productService.getProduct(this.id).subscribe(
      (data) => {
        this.productChosen = data;
      },
      (error: Error) => {
        console.error("Error getting the product");
      });
  }

  public addToCart(){
    this.item = new CartItem();
    this.item.customer = this.user;
    this.item.product = this.productChosen;
    this.item.quantity = parseInt((<HTMLInputElement>document.getElementById("qInput")).value);
    this.item.quantity = this.productChosen.price * this.item.quantity;
  }

}
