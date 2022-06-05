import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderListDto } from 'app/models/dto/order-list-dto';
import { OrderService } from 'app/services/order.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-dash-orders',
  templateUrl: './dash-orders.component.html',
  styleUrls: ['./dash-orders.component.scss']
})
export class DashOrdersComponent implements OnInit {

  sidebarExpanded = true;

  orders: OrderListDto[];

  constructor(private orderService: OrderService, private userService: UserService, private router: Router) {
    this.getAllOrders();
   }

  ngOnInit(): void {
  }

  //Método para listar todos los pedidos
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

  //Método para cerrar sesión
  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
