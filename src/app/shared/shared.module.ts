import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { CartQuantityComponent } from './components/cart-quantity/cart-quantity.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OverlayComponent } from './components/overlay/overlay.component';

@NgModule({
  declarations: [HeaderComponent, CartQuantityComponent, CartItemComponent, OverlayComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, CartQuantityComponent, CartItemComponent, OverlayComponent],
})
export class SharedModule {}
