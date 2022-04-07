import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CartQuantityComponent } from './components/cart-quantity/cart-quantity.component';

@NgModule({
  declarations: [HeaderComponent, CartQuantityComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, CartQuantityComponent],
})
export class SharedModule {}
