import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8090/users/';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any> {
    return this.http.get(API_URL + 'login', { params: { username: user.username, password: user.password } });
  }

  public register(user: User): Observable<any>{
    return this.http.post(API_URL + 'register', user);
  }

  public update(username: string, user: User): Observable<any>{
    return this.http.put(API_URL + `user/${username}`, user);
  }

  public delete(username: string): Observable<any>{
    return this.http.delete(API_URL + `user/${username}`);
  }

  public getUser(username: string): Observable<any>{
    return this.http.get(API_URL + `user/${username}`);
  }

  public getAllUsers():Observable<any>{
    return this.http.get(API_URL + 'list');
  }
}
