import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-quantity',
  template: `
    <button
      class="btn  btn-outline-secondary btn-sm rounded-circle"
      (click)="decrementQuantity()"
    >
      <i class="fa fa-minus" aria-hidden="true"></i>
    </button>
    <span class="mx-3">{{ cartProductQuantity }}</span>
    <button
      class="btn  btn-outline-secondary btn-sm rounded-circle"
      (click)="incrementQuantity()"
    >
      <i class="fa fa-plus" aria-hidden="true"></i>
    </button>
  `,
  styles: [],
})
export class CartQuantityComponent implements OnInit {
  @Input() cartProductQuantity?: number = 0;
  @Output() updateCartQuantityEvent: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  decrementQuantity() {
    this.updateCartQuantityEvent.emit('DECREMENT');
  }

  incrementQuantity() {
    this.updateCartQuantityEvent.emit('INCREMENT');
  }
}
