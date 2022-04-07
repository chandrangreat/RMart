import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CartQuantityGuard } from './core/guards/cart-quantity.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home-page',
  },
  {
    path: 'home-page',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'cart',
    canLoad: [AuthGuard, CartQuantityGuard],
    canActivate: [AuthGuard, CartQuantityGuard],
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'checkout',
    canLoad: [AuthGuard, CartQuantityGuard],
    canActivate: [AuthGuard, CartQuantityGuard],
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
