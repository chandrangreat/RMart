import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductService } from './services/product.service';
import { ProductModalComponent } from './components/product-modal/product-modal.component';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    HomePageComponent,
    ProductCardComponent,
    ProductModalComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  providers: [ProductService],
})
export class HomePageModule {}
