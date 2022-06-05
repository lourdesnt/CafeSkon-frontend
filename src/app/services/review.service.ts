import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from 'app/models/review';

const API_URL = 'http://localhost:8090/reviews/';

//Servicio para reviews
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  //Listar reviews
  public getAllReviews(productId: any):Observable<any>{
    return this.http.get(API_URL + `${productId}`);
  }

  //Nueva review
  public createReview(productId: any, review: Review):Observable<any>{
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      })
    };
    return this.http.post(API_URL + `${productId}/new`, review, HTTP_OPTIONS);
  }

}
