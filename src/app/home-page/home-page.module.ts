import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [HomePageComponent, ProductCardComponent],
  imports: [CommonModule, HomePageRoutingModule, HttpClientModule],
  providers: [ProductService],
})
export class HomePageModule {}
