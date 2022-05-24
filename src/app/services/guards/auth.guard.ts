import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {
    
  }

  canActivate() {
    if (!this.userService.isLogged()) {
      console.log('Not logged in');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
