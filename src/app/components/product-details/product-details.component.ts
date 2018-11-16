import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {Product} from '../../shared/types/Product';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ProductModalComponent} from '../product-modal/product-modal.component';
import {CardProduct} from '../../shared/types/CardProduct';
import {CardService} from '../../shared/services/card.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  public product: Product;
  private afterClose: Subscription;

  constructor(
    public readonly dialog: MatDialog,
    private readonly  router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
    private readonly cardService: CardService,
  ) {
  }

  ngOnInit() {
    this.afterClose = this.activatedRoute.params.pipe(
      mergeMap((params: Params) => this.productService.getProduct(params.id)),
      map(product => this.openDialog(product)),
      mergeMap(dialogRef => dialogRef.afterClosed())
    ).subscribe((product: CardProduct) => {
      if (!product) {
        this.router.navigate(['']);
      } else {
        this.cardService.addToCard(product);
        this.router.navigate(['card']);
      }
    });
  }

  private openDialog(product: Product): MatDialogRef<ProductModalComponent> {
    return this.dialog.open(ProductModalComponent, {
      id: 'product-modal',
      data: product,
    });
  }

  ngOnDestroy() {
    this.afterClose.unsubscribe();
  }
}
