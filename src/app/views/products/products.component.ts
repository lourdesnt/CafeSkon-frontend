import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products = [];
  name : string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
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

}
