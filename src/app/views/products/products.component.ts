import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'app/models/cart-item';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [];
  name : string;

  constructor(private productService: ProductService, private router: Router, private _route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.getAllProducts();
    console.log(this.products[0].image);
  }

  search(event: any){
    this.name = event.target.value.toLowerCase();
    if(this.name && this.name.length>0){
      this.productService.getProductsByName(this.name)
      .toPromise()
      .then(res => {
        this.products = res;
      });
    }
  }

  searchCategory(event:any, category: any){
    this.productService.getProductsByCategory(category)
      .toPromise()
      .then(res => {
        this.products = res;
      });
    }

    getAllProducts(): void {
      //console.log(this.actualUsername);
      this.productService.getAllProducts().subscribe(
        (data) => {
          if(data==null){
            this.products=[];
          } else {
            this.products = data;
          }
          console.log(data);
        },
        (error: Error) => {
          console.error("Error getting products");
        })
    }

}

