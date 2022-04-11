import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-button',
  template: `
    <button
      [disabled]="disableAddToCartButton"
      class="btn btn-secondary"
      (click)="additemToCart()"
    >
      Add To Cart
    </button>
  `,
  styles: [],
})
export class AddToCartButtonComponent implements OnInit {
  @Input() disableAddToCartButton: boolean = false;
  @Output() addItemToCartEvent: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  additemToCart() {
    this.addItemToCartEvent.emit();
  }
}
