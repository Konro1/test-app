import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Observable} from 'rxjs';
import {Product} from '../../shared/types/Product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Observable<Product[]>;

  constructor(private readonly router: Router, private readonly productsService: ProductService) {
  }

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

  async navigateToProduct(id: number) {
    await this.router.navigate(['', id]);
  }
}
