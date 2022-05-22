import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Product } from 'app/models/product';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8090/products/';

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

  public getProductsByCategory(category: Category): Observable<any>{
    return this.http.get(API_URL + `category/${category}`);
  }

  public getProductsByName(name: string): Observable<any>{
    return this.http.get(API_URL + `${name}`);
  }

  public addProduct(product: Product): Observable<any>{
    return this.http.post(API_URL + 'add', product);
  }

  public updateProduct(id: any, product: Product): Observable<any>{
    return this.http.put(API_URL + `update/${id}`, product);
  }

  public deleteProduct(id: any): Observable<any>{
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      })
    };
    return this.http.delete(API_URL + `delete/${id}`, HTTP_OPTIONS);
  }

}
