import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';
import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { InOurCafeComponent } from './views/in-our-cafe/in-our-cafe.component';
import { AboutUsComponent } from './views/about-us/about-us.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { CommonNavbarComponent } from './shared/common-navbar/common-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './views/products/product-detail/product-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from './services/user.service';
import { CartComponent } from './views/cart/cart.component';
import { OrderComponent } from './views/order/order.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AuthGuard } from './services/guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    InOurCafeComponent,
    AboutUsComponent,
    LoginComponent,
    RegisterComponent,
    CommonNavbarComponent,
    ProductDetailComponent,
    CartComponent,
    OrderComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home",                           component: HomeComponent },
      { path: "products",                       component: ProductsComponent },
      { path: "products/product/:id",           component: ProductDetailComponent },
      { path: "cart",                           component: CartComponent },
      { path: "order",
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],               component: OrderComponent },
      { path: "in-our-cafe",                    component: InOurCafeComponent },
      { path: "about-us",                       component: AboutUsComponent },
      { path: "login",                          component: LoginComponent },
      { path: "register",                       component: RegisterComponent },
      { path: "profile",
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],               component: ProfileComponent }
    ]),
    ComponentsModule,
    ExamplesModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
