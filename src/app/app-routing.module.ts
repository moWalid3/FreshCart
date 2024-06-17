import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BrandsComponent } from './components/brands/brands.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path: "", redirectTo: "signup", pathMatch: "full"},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "home", component: HomeComponent},
  {path: "cart", component: CartComponent},
  {path: "brands", component: BrandsComponent},
  {path: "categories", component: CategoriesComponent},
  {path: "**", component: NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
