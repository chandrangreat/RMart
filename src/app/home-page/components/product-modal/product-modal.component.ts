import { Component, OnInit, ContentChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/core/types/Product';
import { CartService } from '../../../core/services/cart.service';
import { CartProduct } from '../../../core/types/Cart';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit {
  product?: Product;
  constructor(
    public bsModalRef: BsModalRef,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  additemToCart() {
    this.cartService.addItemToCart(this.product as CartProduct);
  }
}
