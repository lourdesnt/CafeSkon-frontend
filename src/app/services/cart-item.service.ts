import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';

const API_URL = 'http://localhost:8080/cartitems/';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  constructor(private http: HttpClient) { }

  public getAllItems(username: string):Observable<any>{
    return this.http.get(API_URL + `${username}/list`);
  }

  public getItem(username: string, id: any):Observable<any>{
    return this.http.get(API_URL + `${username}/${id}`);
  }

  public createItem(username: string, item: CartItem):Observable<any>{
    return this.http.post(API_URL + `${username}/new`, item);
  }

  public updateItem(id: any, item: CartItem):Observable<any>{
    return this.http.put(API_URL + `${id}`, item);
  }

  public deleteItem(id: any):Observable<any>{
    return this.http.delete(API_URL + `${id}`);
  }
}
