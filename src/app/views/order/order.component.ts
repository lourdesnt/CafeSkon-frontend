import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    <a routerLink="/home" href="/home"><button type="button" class="btn btn-default btn-sm m-2">Close</button></a>
    </div>
  `
})
export class NgbdModalContent {
  constructor(private router: Router, public activeModal: NgbActiveModal) { }

}
@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
  order: OrderDto; //Pedido a realizar
  items: CartItem[] = JSON.parse(localStorage.getItem("cart")); //Productos del carrito
  currentUser: string; //Usuario actual (nombre de usuario)

  orderForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    postalCode: [
      null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
    ],
    phone: [
      null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(9)],
    ],
    payment: ["Cash", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.order = new OrderDto();
    this.currentUser = localStorage.getItem('username');
  }

  ngOnInit(): void {}

  //M??todo que asocia cada valor de los inputs del formulario con los atributos del pedido
  setOrder(): OrderDto {
    if (!this.currentUser || this.currentUser == null || this.currentUser == '') {
      this.router.navigate(["/login"]); //Si el usuario no est?? loggeado, se redirige hacia la vista de login
      return;
    } else {
      this.order.customerId = localStorage.getItem("username"); //Se establece el usuario del pedido
    }
    this.order.firstName = this.orderForm.controls["firstName"].value;
    this.order.lastName = this.orderForm.controls["lastName"].value;
    this.order.address = this.orderForm.controls["address"].value;
    this.order.postalCode = this.orderForm.controls["postalCode"].value;
    this.order.phone = this.orderForm.controls["phone"].value;
    this.order.payment = this.orderForm.controls["payment"].value;
    this.items.forEach(
      (item) => (this.order.productMap[item.product.id] = item.quantity)
    );
    console.log(this.order);
    return this.order;
  }

  //M??todo submit que crea el pedido
  submit(): void {
    this.order = this.setOrder();
    if (!this.currentUser || this.currentUser == null || this.currentUser == '') {
      return;
    }
    this.orderService.createOrder(this.order).subscribe(
      (data) => {
        console.log(data);
        localStorage.removeItem('cart');
        this.modalService.open(NgbdModalContent);
      },
      (error: Error) => {
        console.error("Error creating order");
      }
    );
  }
}
