import {ProductCategory} from './ProductCategory';
import {ProductImages} from './ProductImages';
import {ProductExtra} from './ProductExtra';

export enum ProductAvailability {
  AVAILABLE = 'available',
  NOT_AVAILABLE = 'not_available',
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  before_sale_price?: number | null;
  full_description?: string;
  order?: number;
  category?: ProductCategory;
  images?: ProductImages;
  extras?: ProductExtra[];
  tags?: string[];
  availability?: ProductAvailability;
}
