import { PaymentComponent } from './payment/payment.component';
import { CaddiesComponent } from './caddies/caddies.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  {path:'products/:p1/:p2', component:ProductsComponent},
  {path:'login', component:LoginComponent},
  //{path:'product-details/:url', component:ProductDetailComponent},
  {path:'client', component:ClientComponent},
  {path:'product/:id', component:ProductDetailComponent},
  {path:'caddies', component:CaddiesComponent},
  {path:'payment/:orderID', component:PaymentComponent},
  {path:'', redirectTo:'products/1/0', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
