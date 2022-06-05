import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-common-navbar',
  templateUrl: './common-navbar.component.html',
  styleUrls: ['./common-navbar.component.scss']
})
export class CommonNavbarComponent implements OnInit {

  loginRouter: string;

  constructor(private userService: UserService) {
    //Si el usuario está loggeado no irá a página de login, sino a la de perfil
    if(userService.isLogged()) {
      this.loginRouter = '/profile';
    } else {
      this.loginRouter = '/login';
    }
   }

  ngOnInit(): void {
  }
  
}
