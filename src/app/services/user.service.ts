import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role, User } from 'app/models/user';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


const API_URL = 'http://localhost:8090/users/';

//Servicio para usuarios
@Injectable()
export class UserService {

  private _user: User | undefined;

  get user(): User{
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  //Login de usuario (obtener usuario)
  public login(user: User): Observable<any> {
    return this.http.get<User>(API_URL + 'login', { params: { username: user.username, password: user.password } })
    .pipe(
      tap(user => this._user = user)
    );
  }

  //Registro de usuario (nuevo usuario)
  public register(user: User): Observable<any>{
    return this.http.post(API_URL + 'register', user).pipe(
      tap(user => this._user = user)
    );
  }

  //Modificar usuario
  public update(username: string, user: User): Observable<any>{
    return this.http.put(API_URL + `user/${username}`, user);
  }

  //Eliminar usuario mediante nombre de usuario
  public delete(username: string): Observable<any>{
    return this.http.delete(API_URL + `user/${username}`);
  }

  //Obtener usuario
  public getUser(username: string): Observable<any>{
    return this.http.get<User>(API_URL + `user/${username}`);
  }

  //Cerrar sesión
  public logout(){
    this._user = undefined;
    localStorage.removeItem('username');
  }

  //Comprobación de si hay un usuario loggeado
  public isLogged() {
    var username = localStorage.getItem('username');
    if(!username || username == null || username == undefined){
      return of(false);
    } else {
      return of(true);
    }
  }

  //Comprobación de si el usuario es admin
  public isAdmin() {
    var username = localStorage.getItem('username');
    console.log(username);
    if(!username || username == null || username == undefined){
      return of(false); //Si no hay ningún usuario loggeado se devuelve false
    }
    var userLogged: User;
    return this.http.get<any>(API_URL + `user/${username}`)
    .pipe(map(data => {
      userLogged = data;
      if(userLogged.role == 'ADMIN'){ 
        return true;
      } else {
        return false;
      }
    }))
  }
}
