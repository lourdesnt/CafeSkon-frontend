import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'app/models/cart-item';
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
              private _route: ActivatedRoute,
              private router: Router) {
                this.items = JSON.parse(localStorage.getItem('cart'));
                if(this.items != null && this.items.length>0){
                  this.total = this.items.map(item => item.product.price*item.quantity).reduce((a,b)=> a+b, 0);
                  console.log(this.items);
                }
               }

  ngOnInit() {

  }

  getItemPrice(item: CartItem): number {
    return item.product.price*item.quantity;
  }

  deleteItem(item: CartItem){
    var matchingItem = this.items.find(i => i.product.id == item.product.id);
    this.items.forEach((product,index)=>{
      if(product==item) this.items.splice(index,1);
   });
   localStorage.setItem('cart', JSON.stringify(this.items));
  }

}
