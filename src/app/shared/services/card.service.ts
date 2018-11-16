import {Injectable} from '@angular/core';
import {CardProduct} from '../types/CardProduct';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private lastId = 0;
  private cardProducts: Map<number, CardProduct> = new Map();

  constructor() {
  }

  public addToCard(product: CardProduct) {
    product.cardId = this.generateId();
    this.cardProducts.set(product.cardId, product);
  }

  public getCard(): CardProduct[] {
    return Array.from(this.cardProducts.values());
  }

  public removeFromCard(cardId: number) {
    this.cardProducts.delete(cardId);
  }

  // for testing purposes in real project this will be uuid generation or beckend ids
  private generateId() {
    return this.lastId++;
  }
}
