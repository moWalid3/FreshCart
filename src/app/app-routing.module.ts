import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BrandsComponent } from './components/brands/brands.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';

const routes: Routes = [
  {path: "", redirectTo: "signup", pathMatch: "full"},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "home", canActivate: [authGuard], component: HomeComponent},
  {path: "products", canActivate: [authGuard], component: ProductsComponent},
  {path: "productdetails/:id", canActivate: [authGuard], component: ProductdetailsComponent},
  {path: "cart", canActivate: [authGuard], component: CartComponent},
  {path: "brands", canActivate: [authGuard], component: BrandsComponent},
  {path: "categories", canActivate: [authGuard], component: CategoriesComponent},
  {path: "**", component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
