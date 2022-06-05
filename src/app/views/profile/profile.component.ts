import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'app/models/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Are you sure you want to delete your account?</h4>
    </div>
    <div class="modal-body">
      <p>Once deleted, it can't be recovered</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-danger btn-sm" (click)="delete()">Delete</button>
    <button type="button" class="btn btn-default btn-sm" (click)="activeModal.close('Close click')">Cancel</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() username;
  
  constructor(private userService: UserService, private router: Router, public activeModal: NgbActiveModal) { }

  public delete(): void {
    this.userService.delete(this.username).subscribe(
      (data) => {
        localStorage.removeItem('username');
        this.activeModal.close();
        this.router.navigate(['/login']);
      },
      (error: Error) => {
        console.error("Error deleting account");
      }
    )
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  actualUser: User; //Usuario actual
  editedUser: User; //Usuario modificado
  actualUsername: string; //Nombre de usuario del usuario actual
  updateFail: boolean; //Indica si la actualización de los datos del usuario se ha realizado mal
  editOk: boolean; //Indica si la modificación de los datos del usuario está bien

  constructor(private userService: UserService, private modalService: NgbModal, private router: Router) { 
    this.actualUser = new User();
    this.editedUser = new User();
    this.updateFail = false;
    this.editOk = false;
  }

  ngOnInit(): void {
    this.actualUsername = localStorage.getItem("username");
    this.userService.getUser(this.actualUsername).subscribe(
      (data) => {
        this.actualUser = data;
        this.editedUser = data;
      },
      (error: Error) => {
        console.error("Error getting user");
      }
    );
  }

  //Método submit para la actualización de los datos del usuario
  submit(): void {
    console.log(this.editedUser);
    this.userService.update(this.actualUsername, this.editedUser).subscribe(
      (data) => {
        this.editOk = true;
        this.updateFail = false;
      },
        (error: Error) => {
          this.editOk = false;
          this.updateFail = true;
          console.error("Error changing account data");
        }
    )
  }

  //Método para cerrar sesión
  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.username = this.actualUsername;
  }

}
