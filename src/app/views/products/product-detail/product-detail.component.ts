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
      <p>Your product has been added to your cart</p>
    </div>
    <div class="modal-footer">
    <a routerLink="/products" href="/products"><button type="button" class="btn btn-default btn-sm m-2">Other products</button></a>
    <a routerLink="/cart" href="/cart"><button type="button" class="btn btn-warning btn-sm m-2">See my cart</button></a>
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

  public productChosen: Product; //Producto seleccionado
  public id: any; //Id del producto seleccionado
  public item: CartItem; //Producto del carrito
  public quantity: number = 1; //Cantidad de producto
  public cart : CartItem[]; //Carrito
  public reviews: Review[]; //Lista de reviews
  public newReview: Review; //Nueva review
  public submitReviewFail: boolean; //Indica si ha fallado enviar la review
  public currentDate = new Date(); //Fecha actual
  public currentUser : string; //Usuario actual (nombre de usuario)
  productRating = 0; //Valoración del producto

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
                if(!this.currentUser || this.currentUser == null || this.currentUser == ''){
                  this.currentUser = 'Anonymous';
                }
              }

  ngOnInit(): void {
    
  }

  //Método para añadir el producto al carrito
  public addToCart(){
    this.item.product = this.productChosen;
    console.log(this.item);
    var matchingItem = this.cart.find(i => i.product.id == this.item.product.id);
    if(matchingItem){
      matchingItem.quantity += this.item.quantity;
    } else {
      this.cart.push(this.item);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.modalService.open(NgbdModalContent);
  }

  //Método para enviar una nueva review
  saveReview(){
    let savedReview: Review = new Review();
    savedReview.username = this.currentUser;
    savedReview.rating = this.newReview.rating;
    savedReview.comment = this.newReview.comment;
    this.reviewService.createReview(this.productChosen.id, savedReview).subscribe(
      (data) => {
        console.log(data);
        this.reviews.push(savedReview);
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
