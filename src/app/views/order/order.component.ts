import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'app/models/cart-item';
import { Order } from 'app/models/order';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order: Order;
  items: CartItem[] = JSON.parse(localStorage.getItem('cart'));

  orderForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    postalCode: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    phone: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(9)]],
    payment: ['Cash', Validators.required]
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.order = new Order();
   }

  setOrder(): Order{
    if(this.userService.isLogged){
      this.order.customer = this.userService.user;
    } else {
      this.router.navigate(['/login']);
      return;
    }
    this.items.forEach(item => item.order = this.order);
    this.order.firstName = this.orderForm.controls['firstName'].value;
    this.order.lastName = this.orderForm.controls['lastName'].value;
    this.order.address = this.orderForm.controls['address'].value;
    this.order.postalCode = this.orderForm.controls['postalCode'].value;
    this.order.phone = this.orderForm.controls['phone'].value;
    this.order.payment = this.orderForm.controls['payment'].value;
    return this.order;
  }

  ngOnInit(): void {
  }

}
