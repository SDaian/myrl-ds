export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  hasDiscount?: boolean;
  priceAfterDiscount?: number;
}

export enum SORT_TYPE {
  ASC = 'asc',
  DESC = 'desc',
}