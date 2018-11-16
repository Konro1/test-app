import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../types/Product';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) {
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>('/assets/products.json').pipe(map(data => {
      return data.products;
    }));
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>('/assets/product.json');
  }
}
