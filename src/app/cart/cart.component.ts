import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartService } from '../core/services/cart.service';
import { RouterService } from '../core/services/router.service';
import { Cart, CartProduct } from '../core/types/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart> = of();

  constructor(
    public cartService: CartService,
    public routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getCart().asObservable();
  }

  updateCartQuantity(updateCart: { cartProduct: CartProduct; action: string }) {
    this.cartService.updateCart(updateCart.cartProduct, updateCart.action);
  }

  goToCheckout() {
    this.routerService.routeToCheckout();
  }
}
