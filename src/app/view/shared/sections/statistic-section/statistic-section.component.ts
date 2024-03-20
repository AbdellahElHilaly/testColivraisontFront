import {Component} from '@angular/core';
import {StatisticPiece} from "./statistic.piece.model";

@Component({
  selector: 'app-statistic-section',
  templateUrl: './statistic-section.component.html',
  styleUrls: ['./statistic-section.component.css']
})
export class StatisticSectionComponent {
  statistics: StatisticPiece[] = [
    {imgSrc: 'awards.png', number: 26, title: 'Awards won'},
    {imgSrc: 'states.png', number: 65, title: 'States covered'},
    {imgSrc: 'clients.png', number: 689, title: 'Happy clients'},
    {imgSrc: 'goods.png', number: 130, title: 'Goods delivered'},
    {imgSrc: 'business.png', number: 130, title: 'Business hours'},
    {imgSrc: 'business.png', number: 37, title: 'Business services'}
  ];


}

