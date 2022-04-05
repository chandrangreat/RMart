import { Observable, of } from 'rxjs';
import { CartService } from './../../../core/services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/core/types/Cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() showCart: boolean = true;
  cart$: Observable<Cart> = of();

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    if (this.showCart) {
      this.cart$ = this._cartService.getCart().asObservable();
    }
  }
}
