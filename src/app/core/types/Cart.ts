import { Product } from './Product';

export interface Cart {
  totalCartPrice: number;
  totalCartItems: number;
  cartProducts: Array<Product>;
}
