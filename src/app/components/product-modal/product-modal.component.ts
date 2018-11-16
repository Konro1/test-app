import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef} from '@angular/material';
import {Product} from '../../shared/types/Product';
import {ProductExtraItem} from '../../shared/types/ProductExtraItem';
import {CardProduct} from '../../shared/types/CardProduct';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})

export class ProductModalComponent implements OnInit {

  public productsCount = 1;
  public extraGroups = {};
  public totalPrice = 0;
  public optionsSelected: Map<number, (ProductExtraItem | Map<number, ProductExtraItem>)> = new Map();
  public isValid = false;

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {
  }

  ngOnInit() {
    this.calculateTotalPrice();
    this.getExtraGroups();
    this.validate();
  }

  incrementCount() {
    this.productsCount++;
    this.calculateTotalPrice();
  }

  decrementCount() {
    this.productsCount--;
    this.calculateTotalPrice();
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    const cardOptions = [];
    this.optionsSelected.forEach(option => {
      if (option instanceof Map) {
        option.forEach(o => {
          cardOptions.push(o);
        });
      } else {
        cardOptions.push(option);
      }
    });

    const cardProduct: CardProduct = {
      ...this.product,
      count: this.productsCount,
      selectedOptions: cardOptions,
      totalPrice: this.totalPrice,
    };

    this.dialogRef.close(cardProduct);
  }

  validate() {
    this.isValid = true;
    const required = this.product.extras.filter(extra => extra.min > 0);
    required.forEach(req => {
      const selected = this.optionsSelected.get(req.id);
      if (!selected) {
        this.isValid = false;
      }
    });
  }

  calculateTotalPrice() {
    this.totalPrice = this.productsCount * (this.product.price + this.calculateOptionsPrice());
  }

  toggleOption(item: ProductExtraItem) {
    this.optionsSelected.delete(item.extra_id);
    this.optionsSelected.set(item.extra_id, item);
    this.calculateTotalPrice();
    this.validate();
  }

  toggleMultipleOptions(item: ProductExtraItem, event: MatCheckboxChange) {
    let selectedExtra = this.optionsSelected.get(item.extra_id) as Map<number, ProductExtraItem>;
    if (!selectedExtra) {
      selectedExtra = new Map();
    }

    if (event.checked) {
      selectedExtra.set(item.id, item);
    } else {
      selectedExtra.delete(item.id);
    }

    this.optionsSelected.set(item.extra_id, selectedExtra);
    this.calculateTotalPrice();
    this.validate();
  }

  reset(extra) {
    this.extraGroups[extra.id] = null;
    this.optionsSelected.delete(extra.id);
    this.calculateTotalPrice();
    this.validate();
  }

  private calculateOptionsPrice(): number {
    let price = 0;
    this.optionsSelected.forEach((option: ProductExtraItem | Map<number, ProductExtraItem>) => {
      if (option instanceof Map) {
        (option as Map<number, ProductExtraItem>).forEach(o => {
          price += o.price;
        });
      } else {
        price += (option as ProductExtraItem).price;
      }
    });

    return price;
  }

  private getExtraGroups() {
    this.product.extras.forEach(extra => {
      this.extraGroups[extra.id] = null;
    });
  }
}
