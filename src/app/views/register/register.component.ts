import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: User; //Usuario a registrar
  public registerFail: boolean; //Indica si se ha realizado el registro mal
  focus;
  focus1;
  focus2;

  constructor(private userService: UserService, private router: Router) {
    this.user = new User();
    this.registerFail = false;
  }

  ngOnInit(): void {
  }

  //Método submit para el registro del usuario
  public submit(): void {
    console.log("user: "+ this.user.username);
    this.userService.register(this.user).subscribe(
      (data) => {
        localStorage.setItem('username', this.user.username);
        this.router.navigate(['/home']);
      },
      (error: Error) => {
        this.registerFail = true;
        console.error("Error al realizar el registro");
      }
    )
  }

}
