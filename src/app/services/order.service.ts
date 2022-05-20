import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrderListDto } from '../models/dto/order-list-dto';
import { OrderDto } from 'app/models/dto/order-dto';

const API_URL = 'http://localhost:8090/orders/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public getAllOrders(orders: OrderListDto[]):Observable<any>{
    return this.http.get(API_URL + 'all');
  }

  public createOrder(order: OrderDto):Observable<any>{
    return this.http.post(API_URL + 'new', order);
  }

  public deleteOrder(id: any): Observable<any>{
    return this.http.delete(API_URL + `${id}`);
  }
}
