import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Product } from 'app/models/product';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8090/products/';

//Servicio para productos
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  //Listar productos
  public getAllProducts():Observable<any>{
    return this.http.get(API_URL + 'list');
  }

  //Obtener producto mediante id
  public getProduct(id: any): Observable<any>{
    return this.http.get(API_URL + `product/${id}`);
  }

  //Obtener productos mediante categoría
  public getProductsByCategory(category: Category): Observable<any>{
    return this.http.get(API_URL + `category/${category}`);
  }

  //Obtener productos mediante nombre
  public getProductsByName(name: string): Observable<any>{
    return this.http.get(API_URL + `${name}`);
  }

  //Nuevo producto
  public addProduct(product: Product): Observable<any>{
    return this.http.post(API_URL + 'add', product);
  }

  //Modificar producto
  public updateProduct(id: any, product: Product): Observable<any>{
    return this.http.put(API_URL + `update/${id}`, product);
  }

  //Eliminar producto mediante id
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
