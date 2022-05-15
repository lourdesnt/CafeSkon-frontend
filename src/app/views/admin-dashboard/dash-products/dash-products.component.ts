import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-products',
  templateUrl: './dash-products.component.html',
  styleUrls: ['./dash-products.component.scss']
})
export class DashProductsComponent implements OnInit {

  sidebarExpanded = true;

  constructor() { }

  ngOnInit(): void {
    
  }

}
