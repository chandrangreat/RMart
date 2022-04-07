import { Injectable } from '@angular/core';
import { Cart, CartProduct } from '../types/Cart';
import { Product } from '../types/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  initialCart: Cart = {
    totalCartItems: 0,
    totalCartPrice: 0,
    cartProducts: [],
  };
  cart: Cart = { totalCartItems: 0, totalCartPrice: 0, cartProducts: [] };

  cartSubject$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.cart);

  constructor() {
    if (!localStorage.getItem('cart')) {
      this.initializeCartInLocalStorage();
    } else {
      this.cart = this.getCartFromLocalStorage();
      this.cartSubject$.next(this.cart);
    }
  }

  initializeCartInLocalStorage(): void {
    this.updateCartInLocalStorage();
  }

  getCartFromLocalStorage(): Cart {
    const cart = localStorage.getItem('cart') ?? '';
    return JSON.parse(cart);
  }

  updateCartInLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  updateCart(product: CartProduct, cartAction: string = 'INCREMENT'): void {
    if (cartAction === 'INCREMENT') {
      product.cartProductPrice = product.cartProductPrice + product.price;
      product.cartProductQuantity = product.cartProductQuantity + 1;
      this.cart.cartProducts = this._updateProductInCart(product);
      // this.cart.totalCartItems = this.cart.totalCartItems + 1;
      this.cart.totalCartPrice = this.cart.totalCartPrice + product.price;
    } else {
      product.cartProductPrice = product.cartProductPrice - product.price;
      product.cartProductQuantity = product.cartProductQuantity - 1;
      if (product.cartProductQuantity !== 0) {
        this.cart.cartProducts = this._updateProductInCart(product);
      } else {
        this.cart.cartProducts = this._updateProductInCart(product, true);
        this.cart.totalCartItems = this.cart.totalCartItems - 1;
      }
      this.cart.totalCartPrice = this.cart.totalCartPrice - product.price;
    }
    this.cartSubject$.next(this.cart);
    this.updateCartInLocalStorage();
  }

  addItemToCart(product: CartProduct): void {
    product.cartProductPrice = product.price;
    product.cartProductQuantity = 1;
    this.cart.cartProducts.push(product);
    this.cart.totalCartItems = this.cart.totalCartItems + 1;
    this.cart.totalCartPrice = this.cart.totalCartPrice + product.price;
    this.cartSubject$.next(this.cart);
    this.updateCartInLocalStorage();
  }

  getCart(): BehaviorSubject<Cart> {
    return this.cartSubject$;
  }

  clearCart(): void {
    this.cart = this.initialCart;
    this.cartSubject$.next(this.cart);
    this.initializeCartInLocalStorage();
  }

  private _updateProductInCart(
    product: CartProduct,
    removeProduct?: boolean
  ): CartProduct[] {
    if (removeProduct) {
      return this.cart.cartProducts.filter(
        (cartProduct) => cartProduct.id !== product.id
      );
    }
    return this.cart.cartProducts.map((cartProduct) => {
      if (cartProduct.id === product.id) {
        return product;
      }
      return cartProduct;
    });
  }
}
