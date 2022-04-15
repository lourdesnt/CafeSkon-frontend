import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

const API_URL = 'http://localhost:8080/orders/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public getAllOrders():Observable<any>{
    return this.http.get(API_URL + 'all');
  }

  public createOrder(order: Order):Observable<any>{
    return this.http.post(API_URL + 'new', order);
  }

  public deleteOrder(id: any): Observable<any>{
    return this.http.delete(API_URL + `${id}`);
  }
}
