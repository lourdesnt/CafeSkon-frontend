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

  public items: CartItem[]; //Lista de productos del carrito
  public finalItems: CartItem[] = []; //Lista definitiva de productos del carrito
  public total: number; //Total del carrito

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

  //Método para actualizar lista de productos del carrito
  updateItemsList(){
    this.finalItems = this.items;
    if(this.finalItems != null && this.finalItems.length>0){
      this.total = this.finalItems.map(item => item.product.price*item.quantity).reduce((a,b)=> a+b, 0);
    }
    localStorage.setItem('cart', JSON.stringify(this.finalItems));
  }

  //Método para obtener el total de cada producto
  getItemPrice(item: CartItem): number {
    this.updateItemsList();
    return item.product.price*item.quantity;
  }

  //Método para obtener el total del carrito
  getTotalPrice(): number {
    this.updateItemsList();
    return this.total;
  }

  //Método para eliminar un producto del carrito
  deleteItem(item: CartItem){
    var matchingItem = this.items.find(i => i.product.id == item.product.id);
    this.items.forEach((product,index)=>{
      if(product==item) this.items.splice(index,1);
   });
   localStorage.setItem('cart', JSON.stringify(this.items));
  }

}
