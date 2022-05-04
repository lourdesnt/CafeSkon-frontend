import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from 'app/models/cart-item';
import { Product } from 'app/models/product';
import { User } from 'app/models/user';
import { ProductService } from 'app/services/product.service';
import { UserService } from 'app/services/user.service';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Yay!</h4>
    </div>
    <div class="modal-body">
      <p>Your product has been add to your cart</p>
    </div>
    <div class="modal-footer">
    <a routerLink="/products" href="/products"><button type="button" class="btn btn-default">Other products</button></a>
    <a routerLink="/cart" href="/cart"><button type="button" class="btn btn-warning">See my cart</button></a>
    </div>
  `
})
export class NgbdModalContent {
  constructor(private router: Router, public activeModal: NgbActiveModal) { }

}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public productChosen: Product;
  public username: string;
  public user: User;
  public id: any;
  public item: CartItem;
  public quantity: number = 1;
  public cart : CartItem[];

  myForm = new FormGroup({}) // Instantiating our form

  constructor(private productService: ProductService,
              private userService: UserService,
              private _route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) {
                this.productChosen = new Product();
                this.id = this._route.snapshot.paramMap.get('id');
                this.productService.getProduct(this.id).subscribe(
                  (data) => {
                    this.productChosen = data;
                  },
                  (error: Error) => {
                    console.error("Error getting the product");
                  });
                var items = localStorage.getItem('cart');
                if(items){
                  this.cart = JSON.parse(items);
                } else {
                  this.cart = [];
                }
              }

  ngOnInit(): void {
    
  }

  public addToCart(){
    this.item = new CartItem();
    this.item.product = this.productChosen;
    this.item.quantity = this.quantity;
    console.log(this.item);
    var matchingItem = this.cart.find(i => i.product.id == this.item.product.id);
    if(matchingItem){
      matchingItem.quantity += this.item.quantity;
    } else {
      this.cart.push(this.item);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    const modalRef = this.modalService.open(NgbdModalContent);
  }

}
