import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/entities/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() post!: Card;
  @Output() selectedPostEvent: EventEmitter<Card> = new EventEmitter();

  cardClicked(card: Card) {
    this.selectedPostEvent.emit(card);
  }

}
