export interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  img: string;
  categoryId: string;
  userId?: number;
}
