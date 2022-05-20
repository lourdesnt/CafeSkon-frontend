import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from 'app/models/cart-item';
import { OrderDto } from 'app/models/dto/order-dto';
import { Order } from 'app/models/order';
import { User } from 'app/models/user';
import { OrderService } from 'app/services/order.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Your order is now registered!</h4>
    </div>
    <div class="modal-body">
      <p>Check your email for more information about your order</p>
    </div>
    <div class="modal-footer">
    <a routerLink="/home" href="/home"><button type="button" class="btn btn-warning">Nice!</button></a>
    </div>
  `
})
export class NgbdModalContent {
  constructor(private router: Router, public activeModal: NgbActiveModal) { }

}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order: OrderDto;
  items: CartItem[] = JSON.parse(localStorage.getItem('cart'));
  //orderCreated: boolean;

  orderForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    postalCode: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    phone: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(9)]],
    payment: ['Cash', Validators.required]
  });

  constructor(private fb: FormBuilder, private userService: UserService, private orderService: OrderService, private router: Router) {
    //this.orderCreated = false;
    this.order = new OrderDto();
  }

  ngOnInit(): void {
  }

  setOrder(): OrderDto{
    if(this.userService.isLogged){
      this.order.customerId = localStorage.getItem('username');
    } else {
      this.router.navigate(['/login']);
      return;
    }
    this.order.firstName = this.orderForm.controls['firstName'].value;
    this.order.lastName = this.orderForm.controls['lastName'].value;
    this.order.address = this.orderForm.controls['address'].value;
    this.order.postalCode = this.orderForm.controls['postalCode'].value;
    this.order.phone = this.orderForm.controls['phone'].value;
    this.order.payment = this.orderForm.controls['payment'].value;
    this.items.forEach(item => this.order.productMap[item.product.id] = item.quantity);
    console.log(this.order);
    return this.order;
  }

  submit(): void {
    this.order = this.setOrder();
    this.orderService.createOrder(this.order).subscribe(
      (data) => {
        console.log(data);
      },
      (error: Error) => {
        //this.orderCreated = true;
        console.error("Error creating order");
      }
    )
  }

}
