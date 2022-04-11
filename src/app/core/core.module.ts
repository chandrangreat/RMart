import { RouterService } from './services/router.service';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AddToCartDirective } from './directives/add-to-cart.directive';
import { ProductInfoDirective } from './directives/product-info.directive';

@NgModule({
  declarations: [ProductInfoDirective],
  imports: [CommonModule],
  providers: [AuthGuard, RouterService],
  exports: [ProductInfoDirective],
})
export class CoreModule {}
