import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from 'app/models/review';

const API_URL = 'http://localhost:8080/reviews/';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  public getAllReviews(productId: any):Observable<any>{
    return this.http.get(API_URL + `${productId}`);
  }

  public createReview(productId: any, review: Review):Observable<any>{
    return this.http.post(API_URL + `${productId}/new`, review);
  }

  public deleteReview(id: any):Observable<any>{
    return this.http.delete(API_URL + `review/${id}`);
  }
}
