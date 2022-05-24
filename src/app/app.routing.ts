import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { ProductDetailComponent } from './views/products/product-detail/product-detail.component';
import { InOurCafeComponent } from './views/in-our-cafe/in-our-cafe.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { CartComponent } from './views/cart/cart.component';
import { OrderComponent } from './views/order/order.component';
import { AuthGuard } from './services/guards/auth.guard';
import { ProfileComponent } from './views/profile/profile.component';
import { DashProductsComponent } from './views/admin-dashboard/dash-products/dash-products.component';
import { DashOrdersComponent } from './views/admin-dashboard/dash-orders/dash-orders.component';
import { DashOrderDetailComponent } from './views/admin-dashboard/dash-orders/dash-order-detail/dash-order-detail.component';
import { AdminGuard } from './services/guards/admin.guard';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductsComponent },
  { path: "products/:id", component: ProductDetailComponent },
  { path: "cart", component: CartComponent },
  { path: "order", component: OrderComponent },
  { path: "in-our-cafe", component: InOurCafeComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard/products",
    component: DashProductsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "dashboard/orders",
    component: DashOrdersComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "dashboard/orders/:id",
    component: DashOrderDetailComponent,
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
