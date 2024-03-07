import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.intefaces';

@Component({
  selector: 'gifts-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {

  @Input()
  public gifs: Gif[] = [];
}
