import {AfterViewInit, Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {PaginationRouteInfoModel} from "@app/core/model/view/pagination-route.model";
import {ColisModel} from "@app/core/model/data/colis.model";
import {PageableModel} from "@app/core/model/pagination/pageable.model";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {ColisStore} from "@app/core/state/colis/colis.store";
import {colisCurrentPageSelector, colisPageByNumberSelector} from "@app/core/state/colis/colis.selector";
import {loadColis, paginateColis} from "@app/core/state/colis/colis.actions";

@Component({
  selector: 'app-list-vendor-colis',
  templateUrl: './list-vendor-colis.component.html',
  styleUrl: './list-vendor-colis.component.css',
})
export class ListVendorColisComponent implements OnInit, AfterViewInit {
  colisListCurrentPage?: Array<ColisModel>;

  currentPage$: Observable<PageableModel<ColisModel>>;

  colisPaginationInfo: PaginationRouteInfoModel = {
    baseUrl: '/vendor/dashboard',
    outletName: 'colis_outlet',
    routeName: 'list',
    paramName: 'colisPageNumber',
    totalPages: 0,
  };
  loading: boolean = false;


  constructor(protected store: Store<ColisStore>, private route: ActivatedRoute
  ) {
    this.currentPage$ = this.store.select(colisCurrentPageSelector);
  }


  ngOnInit(): void {
    this.store.dispatch(loadColis());
    this.currentPage$.subscribe(currentPage => {
      this.colisListCurrentPage = currentPage.content;
      this.colisPaginationInfo.totalPages = currentPage.totalPages;
    });
  }


  ngAfterViewInit(): void {
    initFlowbite();
  }



  protected paginate(): void {
    this.loading = true;
    let page = this.getPageFromUrl();
    let pageFinder = this.store.select(colisPageByNumberSelector(page));
    pageFinder.subscribe(colisPage => {
      if (colisPage) {
        this.colisListCurrentPage = colisPage;
        this.loading = false;
      } else {
        this.store.dispatch(paginateColis({pageNumber: page}));
      }
    });
  }

  private getPageFromUrl(): number {
    let pageNumber = 0;
    this.route.params.subscribe(params => {
      pageNumber = +params[this.colisPaginationInfo.paramName];
    });
    return pageNumber;
  }

}
