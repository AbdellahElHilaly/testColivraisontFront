import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InitPaginationRouteInfoModel, PaginationRouteInfoModel} from "@app/core/model/view/pagination-route.model";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() paginationInfo: PaginationRouteInfoModel = new InitPaginationRouteInfoModel();
  @Output() paginate = new EventEmitter<void>();

  onPaginate() {
    this.paginate.emit();
  }





}
