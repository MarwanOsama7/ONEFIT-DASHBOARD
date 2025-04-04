import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // for forms
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; //for http
import { HttpIntercepterService } from './Services/IntercepterService/http-intercepter.service';



// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CategoryComponent } from './Components/category/category.component';
import { ProductsComponent } from './Components/products/products.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { SigninComponent } from './Components/signin/signin.component';
import { AttributeColorComponent } from './Components/attribute-color/attribute-color.component';
import { AttributeSizeComponent } from './Components/attribute-size/attribute-size.component';
import { AddColorComponent } from './Components/attribute-color/add-color/add-color.component';
import { AddSizeComponent } from './Components/attribute-size/add-size/add-size.component';
import { AddProductComponent } from './Components/products/add-product/add-product.component';
import { EditProductComponent } from './Components/products/edit-product/edit-product.component';
import { EditStockComponent } from './Components/products/edit-stock/edit-stock.component';
import { EditImagesComponent } from './Components/products/edit-images/edit-images.component';
import { AddProductsizeComponent } from './Components/products/add-productsize/add-productsize.component';
import { OrderdetailsComponent } from './Components/orders/orderdetails/orderdetails.component';
import { PromoCodeComponent } from './Components/promo-code/promo-code.component';
import { ShippingComponent } from './Components/shipping/shipping.component';
import { AddPromocodeComponent } from './Components/promo-code/add-promocode/add-promocode.component';
import { AddShippingComponent } from './Components/shipping/add-shipping/add-shipping.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    CategoryComponent,
    ProductsComponent,
    OrdersComponent,
    SigninComponent,
    AttributeColorComponent,
    AttributeSizeComponent,
    AddColorComponent,
    AddSizeComponent,
    AddProductComponent,
    EditProductComponent,
    EditStockComponent,
    EditImagesComponent,
    AddProductsizeComponent,
    OrderdetailsComponent,
    PromoCodeComponent,
    ShippingComponent,
    AddPromocodeComponent,
    AddShippingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
