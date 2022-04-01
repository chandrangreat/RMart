import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Product } from '../../core/types/Product';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {
  productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    []
  );
  products: Array<Product> = [];

  constructor(private _http: HttpClient) {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this._http.get('http://localhost:3000/products').subscribe({
      next: (data: any) => {
        this.products = data;
        this.productsSubject$.next(data);
      },
    });
  }

  getAllProducts() {
    return this.productsSubject$;
  }

  getProductsByCategory(categoryId: string) {
    if (categoryId !== 'all') {
      const filteredByCategoryProduct: Array<Product> = this.products.filter(
        (product) => product.categoryId === categoryId
      );
      this.productsSubject$.next(filteredByCategoryProduct);
    } else {
      this.productsSubject$.next(this.products);
    }
    return this.productsSubject$;
  }
}
