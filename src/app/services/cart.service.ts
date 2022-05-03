import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'app/models/cart';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8090/cart/';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  public getCart(username: string):Observable<any>{
    return this.http.get(API_URL + `${username}`);
  }

  public updateCart(id: any, cart: Cart):Observable<any>{
    return this.http.put(API_URL + `update/${id}`, cart);
  }
}
