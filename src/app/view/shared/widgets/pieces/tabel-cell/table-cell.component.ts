import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrl: './table-cell.component.css'
})
export class TableCellComponent {
  @Input() data?: any;
  @Input() dataList: boolean = false;


  expanded: boolean = false;
  clicked: boolean = false;

  constructor() {
  }

  expandCell() {
    this.expanded = true;
  }

  collapseCell() {
    this.expanded = false;
    this.clicked = false;
  }

  onClick() {
    this.clicked = true;
  }
}
