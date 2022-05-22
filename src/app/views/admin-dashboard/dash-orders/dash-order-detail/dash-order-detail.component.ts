import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'app/models/product';
import { OrderService } from 'app/services/order.service';
import { ProductService } from 'app/services/product.service';
import { OrderDto } from '../../../../models/dto/order-dto';

@Component({
  selector: "app-dash-order-detail",
  templateUrl: "./dash-order-detail.component.html",
  styleUrls: ["./dash-order-detail.component.scss"],
})
export class DashOrderDetailComponent implements OnInit {
  sidebarExpanded = true;

  orderId: any;
  order: OrderDto;
  orderProducts: Product[] = [];

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private productService: ProductService
  ) {
    this.orderId = this._route.snapshot.paramMap.get("id");
    this.orderService.getOrder(this.orderId).subscribe(
      (data) => {
        this.order = data;
        console.log(data);
        this.getProducts();
        console.log(this.orderProducts);
      },
      (error: Error) => {
        console.error("Error getting the order");
    });
    
  }

  getProducts(){
    for (let product in this.order.productMap) {
      this.productService.getProduct(product).subscribe(
        (data) => {
          this.orderProducts.push(data);
        },
        (error: Error) => {
          console.error("Error getting the product");
      })
    }
  }

  getTotalPrice(product: Product): number{
    return this.order.productMap[product.id]*product.price;
  }

  ngOnInit(): void {}
}
