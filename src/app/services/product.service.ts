import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/models/product';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/products/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getAllProducts():Observable<any>{
    return this.http.get(API_URL + 'list');
  }

  public getProduct(id: any): Observable<any>{
    return this.http.get(API_URL + `product/${id}`);
  }

  public addProduct(product: Product): Observable<any>{
    return this.http.post(API_URL + 'add', product);
  }

  public updateProduct(id: any, product: Product): Observable<any>{
    return this.http.put(API_URL + `update/${id}`, product);
  }

  public deleteProduct(id: any): Observable<any>{
    return this.http.delete(API_URL + `delete/${id}`);
  }

}
