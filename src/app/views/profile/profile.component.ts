import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  username: string;

  constructor() {
    this.username = localStorage.getItem('username');
   }

  ngOnInit(): void {
  }

}
