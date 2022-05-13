import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap'; 
import { CartItem } from 'app/models/cart-item';
import { Product } from 'app/models/product';
import { User } from 'app/models/user';
import { ProductService } from 'app/services/product.service';
import { UserService } from 'app/services/user.service';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { ReviewService } from 'app/services/review.service';
import { Review } from 'app/models/review';

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
  public reviews: Review[];
  public newReview: Review;
  public submitReviewFail: boolean;
  public currentDate = new Date();
  public currentUser;
  productRating = 0;

  constructor(private productService: ProductService,
              private reviewService: ReviewService,
              private _route: ActivatedRoute,
              private router: Router,
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
                this.item = new CartItem();

                this.reviewService.getAllReviews(this.id).subscribe(
                  (data) => {
                    this.reviews = data || [];
                    this.productChosen.reviews = this.reviews;
                  },
                  (error: Error) => {
                    console.error("Error getting reviews");
                });

                this.newReview = new Review();
                this.submitReviewFail = false;

                this.currentUser = localStorage.getItem('username');
              }

  ngOnInit(): void {
    
  }

  public addToCart(){
    this.item.product = this.productChosen;
    //this.item.quantity = this.quantity;
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

  saveReview(){
    this.newReview.product = this.productChosen;
    if(this.currentUser == null || this.currentUser === ''){
      this.currentUser = 'Anonymous';
    }
    this.newReview.username = this.currentUser;
    //this.reviews.push(this.newReview);
    this.reviewService.createReview(this.productChosen, this.newReview).subscribe(
      (data) => {
        console.log(data);
        this.reviews.push(this.newReview);
      },
      (error: Error) => {
        this.submitReviewFail = true;
        console.error("Error submitting review");
      }
    )
    console.log(this.reviews);
    this.newReview = new Review();
  }

}
