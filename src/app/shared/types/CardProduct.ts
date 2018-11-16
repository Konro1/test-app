import {Product} from './Product';
import {ProductExtraItem} from './ProductExtraItem';

export interface CardProduct extends Product {
  cardId?: number;
  count: number;
  selectedOptions: ProductExtraItem[];
  totalPrice: number;
}
