import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
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
    SharedModule,
    ModalModule.forRoot(),
  ],
})
export class HomePageModule {}
