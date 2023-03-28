import { CartQuantityComponent } from './../../../shared/components/cart-quantity/cart-quantity.component';
import { AddToCartButtonComponent } from './../../../shared/components/add-to-cart-button/add-to-cart-button.component';
import { AddToCartDirective } from './../../../core/directives/add-to-cart.directive';
import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild,
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
  @ViewChild(AddToCartDirective, { static: true })
  addToCart!: AddToCartDirective;

  constructor(
    private modalService: BsModalService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartServiceSubscription = this.cartService.cartSubject$
      .asObservable()
      .subscribe((cart) => {
        const viewContainerRef = this.addToCart.viewContainerRef;
        viewContainerRef.clear();
        this.cartProduct = cart.cartProducts.filter(
          (cartProduct) => cartProduct.id === this.product?.id
        )[0];

        if (!this.cartProduct || this.cartProduct.cartProductQuantity === 0) {
          const componentRef =
            viewContainerRef.createComponent<AddToCartButtonComponent>(
              AddToCartButtonComponent
            );
          this.checkQuantityAndDisableButton();
          componentRef.instance.disableAddToCartButton =
            this.disableAddToCartButton;
          componentRef.instance.addItemToCartEvent.subscribe(() => {
            this.additemToCart();
          });
          // this.showAddToCart = true;
        } else {
          const componentRef =
            viewContainerRef.createComponent<CartQuantityComponent>(
              CartQuantityComponent
            );
          // this.showAddToCart = false;
          this.checkQuantityAndDisableButton();
          componentRef.instance.disableIncrementButton =
            this.disableAddToCartButton;
          componentRef.instance.cartProductQuantity =
            this.cartProduct.cartProductQuantity;
          componentRef.instance.updateCartQuantityEvent.subscribe(
            (action: string) => {
              this.updateCartProductQuantity(action);
            }
          );
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
