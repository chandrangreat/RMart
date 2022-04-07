import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartProduct } from '../../../core/types/Cart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartProduct?: CartProduct;
  @Input() isDisplayedAsItemSummary?: boolean = true;
  @Output() updateCartQuantityEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  updateCartProductQuantity(action: string) {
    this.updateCartQuantityEvent.emit({
      cartProduct: this.cartProduct,
      action: action,
    });
  }
}
