import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  DoCheck,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/types/Product';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input() cartProduct?: Product;
  @Input() isDisplayedAsItemSummary?: boolean = true;
  @Output() updateCartQuantityEvent: EventEmitter<any> = new EventEmitter();
  disableQuantityButton: boolean = false;
  cartServiceSubscription: Subscription | undefined;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this.cartServiceSubscription = this._cartService.cartSubject$
      .asObservable()
      .subscribe((cart) => {
        this.cartProduct = cart.cartProducts.filter(
          (cartProduct) => cartProduct.id === this.cartProduct?.id
        )[0];
        this.checkQuantityAndDisableButton();
      });
  }

  // ngDoCheck(): void {
  //   console.log('Do Check');
  //   if (this.cartProduct?.quantity === 0) {
  //     this.disableCartButton = true;
  //   } else {
  //     this.disableCartButton = false;
  //   }
  // }

  updateCartProductQuantity(action: string) {
    this.updateCartQuantityEvent.emit({
      cartProduct: this.cartProduct,
      action: action,
    });
  }

  checkQuantityAndDisableButton() {
    if (this.cartProduct && this.cartProduct?.quantity === 0) {
      this.disableQuantityButton = true;
    } else {
      this.disableQuantityButton = false;
    }
  }

  ngOnDestroy(): void {
    this.cartServiceSubscription?.unsubscribe();
  }
}
