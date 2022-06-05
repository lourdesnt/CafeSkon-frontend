import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
    
  }

  canActivate() {
    return this.userService.isLogged()
     .pipe(map((res) => {
        if ( res === true && localStorage.getItem('username')!="admin") {
             return true;
        } else if(localStorage.getItem('username')=="admin"){
            console.log('Admin');
            this.router.navigate(['/dashboard/products']);
            return false;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
    }));
  }
}
