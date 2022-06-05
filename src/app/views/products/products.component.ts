import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'app/models/cart-item';
import { Category } from 'app/models/product';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss", "../../../styles.scss"],
})
export class ProductsComponent implements OnInit {
  products = []; //Lista de productos
  name: string; //Nombre de producto

  constructor(
    private productService: ProductService,
    private router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  //Método para buscar producto por nombre
  search(event: any) {
    this.name = event.target.value.toLowerCase();
    if (this.name && this.name.length > 0) {
      this.productService
        .getProductsByName(this.name)
        .toPromise()
        .then((res) => {
          this.products = res;
        });
    }
  }

  //Método para filtrar productos por categoría
  searchCategory(event: any, category: Category) {
    this.productService
      .getProductsByCategory(category)
      .toPromise()
      .then((res) => {
        this.products = res;
      });
  }

  //Método para listar todos los productos
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        if (data == null) {
          this.products = [];
        } else {
          this.products = data;
        }
        console.log(data);
      },
      (error: Error) => {
        console.error("Error getting products");
      }
    );
  }
}

