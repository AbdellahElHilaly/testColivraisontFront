import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InitPaginationRouteInfoModel, PaginationRouteInfoModel} from "@app/core/model/view/pagination-route.model";


@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.css']
})
export class TableFooterComponent implements OnInit {


  @Input() paginationInfo: PaginationRouteInfoModel = new InitPaginationRouteInfoModel();
  @Output() paginate = new EventEmitter<void>();

  protected currentPage: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
  }


  nextPage() {
    if (this.currentPage < this.paginationInfo.totalPages - 1) this.changePageInUrl(++this.currentPage);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.changePageInUrl(--this.currentPage);
    }
  }

  protected changePageInUrl(page: number) {
    if (page < 0 || page >= this.paginationInfo.totalPages) return;
    this.currentPage = page;
    this.router.navigate([
      this.paginationInfo.baseUrl,
      this.getOutletRoute(page)
    ]).then(r => {
      this.paginate.emit();
    });
  }

  private getOutletRoute(page: number) {
    return {
      outlets: {
        [this.paginationInfo.outletName]: [this.paginationInfo.routeName, page.toString()]
      }
    };
  }


}
