import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/core/types/Product';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { CartService } from '../../../core/services/cart.service';
import { CartProduct } from '../../../core/types/Cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product?: Product;
  cartProduct: CartProduct = {} as CartProduct;
  showAddToCart: boolean = true;
  bsModalRef?: BsModalRef;
  cartServiceSubscription: Subscription | undefined;

  constructor(
    private modalService: BsModalService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartServiceSubscription = this.cartService.cartSubject$
      .asObservable()
      .subscribe((cart) => {
        this.cartProduct = cart.cartProducts.filter(
          (cartProduct) => cartProduct.id === this.product?.id
        )[0];

        if (!this.cartProduct || this.cartProduct.cartProductQuantity === 0) {
          this.showAddToCart = true;
        } else {
          this.showAddToCart = false;
        }
      });
  }

  openProductModal() {
    const initialState: ModalOptions = {
      initialState: {
        product: this.product,
      },
    };

    this.bsModalRef = this.modalService.show(
      ProductModalComponent,
      initialState
    );
  }

  additemToCart() {
    this.cartService.addItemToCart(this.product as CartProduct);
  }

  updateCartProductQuantity(action: string) {
    this.cartService.updateCart(this.cartProduct, action);
  }

  ngOnDestroy(): void {
    this.cartServiceSubscription?.unsubscribe();
  }
}
