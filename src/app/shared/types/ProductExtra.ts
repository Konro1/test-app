import {ProductExtraItem} from './ProductExtraItem';

export interface ProductExtra {
  id: number;
  name: string;
  min: number;
  max: number;
  items: ProductExtraItem[];
}
