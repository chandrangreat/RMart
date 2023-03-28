import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Product } from '../types/Product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
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

  updateProductQuantity(cartProduct: Product, cartAction: string) {
    if (cartProduct) {
      if (cartAction === 'DECREMENT') {
        cartProduct.quantity = cartProduct.quantity - 1;
        cartProduct.cartProductQuantity = cartProduct.cartProductQuantity + 1;
        cartProduct.cartProductPrice =
          cartProduct.cartProductPrice + cartProduct.price;
      } else {
        cartProduct.quantity = cartProduct.quantity + 1;
        cartProduct.cartProductQuantity = cartProduct.cartProductQuantity - 1;
        cartProduct.cartProductPrice =
          cartProduct.cartProductPrice - cartProduct.price;
      }
      let updatedProduct = cartProduct;
      return this._http
        .put(`http://localhost:3000/products/${cartProduct.id}`, updatedProduct)
        .pipe(
          tap(() => {
            const products = this.products.map((product) => {
              if (product.id === cartProduct.id) {
                return updatedProduct;
              }
              return product;
            });
            this.products = products;
            this.productsSubject$.next(products);
          })
        );
    } else {
      throw new Error('Product Not Found');
    }
  }
}
