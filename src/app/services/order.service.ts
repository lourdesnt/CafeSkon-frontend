import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrderListDto } from '../models/dto/order-list-dto';
import { OrderDto } from 'app/models/dto/order-dto';

const API_URL = 'http://localhost:8090/orders/';

//Servicio para pedidos
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  //Listar pedidos
  public getAllOrders():Observable<any>{
    return this.http.get(API_URL + 'all');
  }

  //Obtener pedido mediante id
  public getOrder(id: any):Observable<any>{
    return this.http.get(API_URL + `order/${id}`);
  }

  //Nuevo pedido
  public createOrder(order: OrderDto):Observable<any>{
    return this.http.post(API_URL + 'new', order);
  }

  //Eliminar pedido mediante id
  public deleteOrder(id: any): Observable<any>{
    return this.http.delete(API_URL + `${id}`);
  }
}
