import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Product } from 'src/app/core/types/Product';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { CartService } from '../../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product?: Product;
  @Output() openOverlayWithProductEvent: EventEmitter<any> = new EventEmitter();
  cartProduct: Product = {} as Product;
  showAddToCart: boolean = true;
  bsModalRef?: BsModalRef;
  cartServiceSubscription: Subscription | undefined;
  disableAddToCartButton: boolean = false;

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
          this.checkQuantityAndDisableButton();
        } else {
          this.showAddToCart = false;
          this.checkQuantityAndDisableButton();
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
    if (this.product) {
      this.cartService.addItemToCart(this.product);
    }
  }

  updateCartProductQuantity(action: string) {
    this.cartService.updateCart(this.cartProduct, action);
  }

  ngOnDestroy(): void {
    this.cartServiceSubscription?.unsubscribe();
  }

  checkQuantityAndDisableButton() {
    if (this.product && this.product?.quantity === 0) {
      this.disableAddToCartButton = true;
    } else {
      this.disableAddToCartButton = false;
    }
  }

  openOverlayWithProduct() {
    this.openOverlayWithProductEvent.emit(this.product);
  }
}
