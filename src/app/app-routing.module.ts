import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CategoryComponent } from './Components/category/category.component';
import { SigninComponent } from './Components/signin/signin.component';
import { AuthGuard } from './Services/guards/auth.guard';
import { AttributeColorComponent } from './Components/attribute-color/attribute-color.component';
import { AddColorComponent } from './Components/attribute-color/add-color/add-color.component';
import { AttributeSizeComponent } from './Components/attribute-size/attribute-size.component';
import { AddSizeComponent } from './Components/attribute-size/add-size/add-size.component';
import { ProductsComponent } from './Components/products/products.component';
import { AddProductComponent } from './Components/products/add-product/add-product.component';
import { EditProductComponent } from './Components/products/edit-product/edit-product.component';
import { EditStockComponent } from './Components/products/edit-stock/edit-stock.component';
import { EditImagesComponent } from './Components/products/edit-images/edit-images.component';
import { AddProductsizeComponent } from './Components/products/add-productsize/add-productsize.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { OrderdetailsComponent } from './Components/orders/orderdetails/orderdetails.component';
import { PromoCodeComponent } from './Components/promo-code/promo-code.component';
import { ShippingComponent } from './Components/shipping/shipping.component';
import { AddPromocodeComponent } from './Components/promo-code/add-promocode/add-promocode.component';
import { AddShippingComponent } from './Components/shipping/add-shipping/add-shipping.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }, // Redirect to dashboard if path is empty
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'completedorders', component: OrdersComponent },
  { path: 'promocode', component: PromoCodeComponent },
  { path: 'addpromocode', component: AddPromocodeComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'addshipping', component: AddShippingComponent },
  { path: 'addshipping/:id', component: AddShippingComponent },
  { path: 'order-details', component: OrderdetailsComponent },
  { path: 'attributescolor', component: AttributeColorComponent },
  { path: 'attributessize', component: AttributeSizeComponent },
  { path: 'addcolor', component: AddColorComponent },
  { path: 'addsize', component: AddSizeComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'editproduct/:slug', component: EditProductComponent },
  { path: 'editstock/:id', component: EditStockComponent },
  { path: 'editimages/:id', component: EditImagesComponent },
  { path: 'addproductsize/:id', component: AddProductsizeComponent },
  { path: 'signin', component: SigninComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
