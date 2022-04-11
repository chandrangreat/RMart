import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../core/types/Product';
import { ProductService } from '../core/services/product.service';
import { BsModalRef, ModalOptions, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  categories: Array<{ name: string; id: string }> = [
    { name: 'All Products', id: 'all' },
    { name: 'Shoes', id: 'shoes' },
    { name: 'Shirts', id: 'shirts' },
    { name: 'Pants', id: 'pants' },
    { name: 'Jeans', id: 'jeans' },
    { name: 'Socks', id: 'socks' },
    { name: 'Jackets', id: 'jackets' },
  ];

  selectedCategory: string = 'all';
  selectedCategoryTitle: string = 'All Products';

  products$: Subject<Array<Product>> = new Subject();

  overlayProduct: Product = {} as Product;

  bsModalRef?: BsModalRef;

  @ViewChild('childModal', { static: false }) childModal?: ModalDirective;

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this._productService.getAllProducts();
  }

  loadProductsOfCategory(category: { name: string; id: string }): void {
    this.products$ = this._productService.getProductsByCategory(category.id);
    this.selectedCategory = category.id;
    this.selectedCategoryTitle = category.name;
  }

  openOverlayWithProduct(product: Product) {
    this.overlayProduct = product;
    this.childModal?.show();
  }

  hideChildModal(): void {
    this.childModal?.hide();
  }
}
