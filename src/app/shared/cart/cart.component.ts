import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'app/models/cart-item';
import { CartService } from 'app/services/cart.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public items: CartItem[];
  public total: number;

  constructor(private userService: UserService,
              private cartService: CartService,
              private _route: ActivatedRoute,
              private router: Router) {
                this.items = JSON.parse(localStorage.getItem('cart'));
               }

  ngOnInit(): void {
  }

}
