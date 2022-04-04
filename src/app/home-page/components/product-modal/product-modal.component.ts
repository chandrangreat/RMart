import { Component, OnInit, ContentChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Product } from 'src/app/core/types/Product';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit {
  product?: Product;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}
}
