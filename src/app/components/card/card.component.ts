import {Component, OnInit} from '@angular/core';
import {CardProduct} from '../../shared/types/CardProduct';
import {CardService} from '../../shared/services/card.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public cardProducts: CardProduct[] = [];

  constructor(private readonly router: Router, private readonly cardService: CardService) {
  }

  ngOnInit() {
    this.cardProducts = this.cardService.getCard();
  }

  async navigateTo(params) {
    await this.router.navigate(params);
  }

  removeFromCard(id: number) {
    this.cardService.removeFromCard(id);
    this.cardProducts = this.cardService.getCard();
  }
}
