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
  
  products: Product[] = [];

  addedProduct: Product = new Product();;

  addProductForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    price: [null, [Validators.required, Validators.min(0.00), Validators.max(1000.00)]],
    image: [null, Validators.required],
    category: ["CAKE", Validators.required]
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
          console.log(this.products.length);
        }
        console.log(data);
      },
      (error: Error) => {
        console.error("Error getting products");
      })
  }

  setProduct(): Product {
    this.addedProduct.name = this.addProductForm.controls["name"].value;
    this.addedProduct.description = this.addProductForm.controls["description"].value;
    this.addedProduct.price = parseFloat(this.addProductForm.controls["price"].value);
    this.addedProduct.image = this.addProductForm.controls["image"].value;
    this.addedProduct.category = this.addProductForm.controls["category"].value;
    if(this.addedProduct.id == 0){
       this.addedProduct.id = this.products.length+1;
    }
    console.log(this.addedProduct);
    return this.addedProduct;
  }

  editProduct(id: any, product: Product) {
    this.addProductForm.controls["name"].setValue(product.name);
    this.addProductForm.controls["description"].setValue(product.description);
    this.addProductForm.controls["price"].setValue(product.price);
    this.addProductForm.controls["image"].setValue(product.image);
    this.addProductForm.controls["category"].setValue(product.category);
    this.addedProduct.id = id;
    console.log(this.addedProduct.id);
  }

  delete(id: any) {
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        //parent.location.reload();
        this.getAllProducts();
      },
      (error: Error) => {
        console.error("Error deleting product");
      }
    )
  }

  submit(){
    this.addedProduct = this.setProduct();
    if(this.products.indexOf(this.addedProduct) !== -1){
      this.productService.updateProduct(this.addedProduct.id, this.addedProduct).subscribe(
        (data) => {
          console.log(data);
          this.getAllProducts();
        },
        (error: Error) => {
          console.error("Error updating product");
        }
      );
    } else {
      this.productService.addProduct(this.addedProduct).subscribe(
        (data) => {
          console.log(data);
          this.getAllProducts();
        },
        (error: Error) => {
          console.error("Error adding product");
        }
      );
    }
    this.addedProduct = new Product();
  }



}
