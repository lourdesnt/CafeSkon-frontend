import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: User; //Usuario a loggear
  public loginFail: boolean; //Indica si ha habido algún error en el login
  focus;
  focus1;

  constructor(private userService: UserService, private router: Router) {
    this.user = new User();
    this.loginFail = false;
    
  }

  ngOnInit(): void {
    
  }

  //Método submit para el login del usuario
  public submit(): void {
    console.log("User: "+ this.user.username);
    this.userService.login(this.user).subscribe(
      (data) => {
        localStorage.setItem('username', this.user.username);
        if(!this.userService.isAdmin()){
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/dashboard/products']);
        }
      },
      (error: Error) => {
        this.loginFail = true;
        console.error("Error getting access");
      }
    )
  }

}
