import { Component, OnInit } from '@angular/core';
import { OrderListDto } from 'app/models/dto/order-list-dto';
import { OrderService } from 'app/services/order.service';

@Component({
  selector: 'app-dash-orders',
  templateUrl: './dash-orders.component.html',
  styleUrls: ['./dash-orders.component.scss']
})
export class DashOrdersComponent implements OnInit {

  sidebarExpanded = true;

  orders: OrderListDto[];

  constructor(private orderService: OrderService) {
    this.getAllOrders();
   }

  ngOnInit(): void {
  }

  getAllOrders(){
    this.orderService.getAllOrders().subscribe(
      (data) => {
        if(data==null){
          this.orders=[];
        } else {
          this.orders = data;
        }
        console.log(data);
      },
      (error: Error) => {
        console.error("Error getting orders");
      })
  }

}
