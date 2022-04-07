import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from '../core/services/cart.service';
import { Cart, CartProduct } from '../core/types/Cart';
import { Observable, of } from 'rxjs';
import { CheckoutService } from './services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    paymentMethod: new FormControl('Cash On Delivery', [Validators.required]),
  });

  cart$: Observable<Cart> = of();

  constructor(
    public cartService: CartService,
    public checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.cartService.getCart().asObservable();
  }

  submitCheckoutForm() {
    this.checkoutService.placeOrder(this.checkoutForm.value);
  }

  get name() {
    return this.checkoutForm.get('name');
  }

  get address() {
    return this.checkoutForm.get('address');
  }
}
