import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'app/models/product';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-dash-products',
  templateUrl: './dash-products.component.html',
  styleUrls: ['./dash-products.component.scss']
})
export class DashProductsComponent implements OnInit {

  sidebarExpanded = true;
  
  products: Product[];

  product: Product;

  addProductForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    price: [null, [Validators.required, Validators.min(0.00), Validators.max(1000.00)]],
    image: [null, Validators.required],
    category: ["COOKIE", Validators.required]
  });

  constructor(private productService: ProductService, private fb: FormBuilder) { 
    this.getAllProducts();
  }

  ngOnInit(): void {
    
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      (data) => {
        if(data==null){
          this.products = [];
        } else {
          this.products = data;
        }
        console.log(data);
      },
      (error: Error) => {
        console.error("Error getting products");
      })
  }

  setProduct(): Product {
    this.product.name = this.addProductForm.controls["name"].value;
    this.product.description = this.addProductForm.controls["description"].value;
    this.product.price = parseFloat(this.addProductForm.controls["price"].value);
    this.product.image = this.addProductForm.controls["image"].value;
    this.product.category = this.addProductForm.controls["category"].value;
    console.log(this.product);
    return this.product;
  }

  editProduct(product: Product) {
    this.addProductForm.controls["name"].setValue(product.name);
    this.addProductForm.controls["description"].setValue(product.description);
    this.addProductForm.controls["price"].setValue(product.price);
    this.addProductForm.controls["image"].setValue(product.image);
    this.addProductForm.controls["category"].setValue(product.category);
    console.log(this.product);
  }

  submit(){
    this.product = this.setProduct();
    if(this.products.filter(p => p.id === this.product.id)){
      this.productService.updateProduct(this.product.id, this.product).subscribe(
        (data) => {
          console.log(data);
          this.getAllProducts();
        },
        (error: Error) => {
          console.error("Error updating product");
        }
      );
    } else {
      this.productService.addProduct(this.product).subscribe(
        (data) => {
          console.log(data);
          this.getAllProducts();
        },
        (error: Error) => {
          console.error("Error adding product");
        }
      );
    }
  }



}
