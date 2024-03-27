import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dashboard-section-title',
  templateUrl: './dashboard-section-title.component.html',
  styleUrl: './dashboard-section-title.component.css'
})
export class DashboardSectionTitleComponent {
  @Input() title: string = '';
  @Input() routs: Array<string> = [];


}
