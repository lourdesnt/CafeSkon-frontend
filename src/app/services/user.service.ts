import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/models/user';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


const API_URL = 'http://localhost:8090/users/';

@Injectable()
export class UserService {

  private _user: User | undefined;

  get user(): User{
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any> {
    return this.http.get<User>(API_URL + 'login', { params: { username: user.username, password: user.password } })
    .pipe(
      tap(user => this._user = user)
    );
  }

  public register(user: User): Observable<any>{
    return this.http.post(API_URL + 'register', user).pipe(
      tap(user => this._user = user)
    );
  }

  public update(username: string, user: User): Observable<any>{
    return this.http.put(API_URL + `user/${username}`, user);
  }

  public delete(username: string): Observable<any>{
    return this.http.delete(API_URL + `user/${username}`);
  }

  public getUser(username: string): Observable<any>{
    return this.http.get<User>(API_URL + `user/${username}`);
  }

  public getAllUsers():Observable<any>{
    return this.http.get(API_URL + 'list');
  }

  public logout(){
    this._user = undefined;
    localStorage.setItem('username', null);
  }

  public isLogged(): Observable<boolean> {
    var username = localStorage.getItem('username');
    if(!username){
      return of(false);
    }
    var userLogged: User;
    this.getUser(username).subscribe(user => userLogged = user);
    return this.http.get<User>(API_URL + 'login', { params: { username: userLogged.username, password: userLogged.password } })
    .pipe(
      map(user => {
        this._user = user;
        return true;
      })
    );
  }
}
