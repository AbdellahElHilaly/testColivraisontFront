import {Component, Input} from '@angular/core';
import {CardStatisticsModel} from "@app/core/model/view/card-statistics.model";

@Component({
  selector: 'app-vendor-statistics-card',
  templateUrl: './vendor-statistics-card.component.html',
  styleUrl: './vendor-statistics-card.component.css'
})
export class VendorStatisticsCardComponent {

  @Input() cardStatisticsModel?:CardStatisticsModel;

}
