import {Component, Input, OnInit} from '@angular/core';
import {CardData} from "./card-data";

@Component({
  selector: 'app-home-service-card',
  templateUrl: './home-service-card.component.html',
  styleUrl: './home-service-card.component.css'
})
export class HomeServiceCardComponent implements OnInit {


  @Input() cardIndex?: number;
  index: number = 0;


  cards: Array<CardData> = [
    {
      icon: 'assets/img/icons/services-1.svg',
      title: 'Business Services',
      header: 'Offering home delivery around the city, where your products will be at your doorstep within 48-72 hours.',
      content: ['Corporate goods', 'Shipment', 'Accesories'],
      isPrimary: false
    },
    {
      icon: 'assets/img/icons/services-2.svg',
      title: 'Statewide Services',
      header: 'Offering home delivery around the city, where your products will be at your doorstep within 48-72 hours.',
      content: ['Unlimited Bandwidth', 'Encrypted Connection', 'Yes Traffic Logs'],
      isPrimary: true
    },
    {
      icon: 'assets/img/icons/services-3.svg',
      title: 'Personal Services',
      header: 'You can trust us to safely deliver your most sensitive documents to the specific area in a short time.',
      content: ['Unlimited Bandwidth', 'Encrypted Connection', 'Yes Traffic Logs'],
      isPrimary: false
    },

  ]


  ngOnInit(): void {
    if (this.cardIndex) {
      this.index = this.cardIndex;
    }
  }

}
