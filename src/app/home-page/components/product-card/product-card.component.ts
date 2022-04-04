import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/types/Product';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product?: Product;
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

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
}
