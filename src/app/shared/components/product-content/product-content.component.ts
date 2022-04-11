import { Product } from 'src/app/core/types/Product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-content',
  template: `
    <img [src]="product?.img" class="card-img-top" [alt]="product?.name" />
    <div class="card-body">
      <h5 class="card-title">{{ product?.name }}</h5>
      <p class="card-text">{{ product?.description }}</p>
      <p class="card-text">
        {{ product?.price | currency: 'INR':'symbol':'1.0-0' }}
      </p>
    </div>
  `,
  styles: [],
})
export class ProductContentComponent implements OnInit {
  @Input() product: Product = {} as Product;
  constructor() {}

  ngOnInit(): void {}
}
