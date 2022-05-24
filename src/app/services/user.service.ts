import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role, User } from 'app/models/user';
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
    localStorage.removeItem('username');
  }

  public isLogged(): boolean {
    var username = localStorage.getItem('username');
    if(!username || username == null || username == undefined){
      return false;
    }else{
      return true;
    }
  }

  public isAdmin(): boolean {
    var username = localStorage.getItem('username');
    var isAdmin: boolean;
    console.log(username);
    if(!username || username == null || username == undefined){
      return false;
    }
    var userLogged: User;
    this.getUser(username).subscribe(
      user => {
        userLogged = user;
        if(userLogged.role == 'ADMIN'){ 
          isAdmin = true;
        } else {
          isAdmin = false;
        }
      }
    );
    return isAdmin;
  }
}
