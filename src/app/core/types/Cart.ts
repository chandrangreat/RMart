import { Product } from './Product';

export interface CartProduct extends Product {
  cartProductPrice: number;
  cartProductQuantity: number;
}

export interface Cart {
  totalCartPrice: number;
  totalCartItems: number;
  cartproducts: Array<CartProduct>;
}
