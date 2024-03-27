import {
  Component,
  OnInit
} from '@angular/core';
import {PaginationRouteInfoModel} from "@app/core/model/view/pagination-route.model";
import {ColisModel} from "@app/core/model/data/colis.model";
import {PageableModel} from "@app/core/model/pagination/pageable.model";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {ColisStore} from "@app/core/state/colis/colis.store";
import {colisCurrentPageSelector, colisPageByNumberSelector} from "@app/core/state/colis/colis.selector";
import {loadColis, paginateColis, removeColis, updateColisSuccess} from "@app/core/state/colis/colis.actions";
import {CrudApiService} from "@app/core/service/rest/crud-api.service";
import {subEndpoints, vendorEndpoints} from "@app/utils/env/api.env";
import {RamassageStore} from "@app/core/state/ramassage/ramassage.store";
import {addRamassage} from "@app/core/state/ramassage/ramassage.actions";
import {VendorStatisticsStore} from "@app/core/state/vendor-statistics/vendor-statistics.store";
import {
  addRamassageVendorStatistics,
  removeColisVendorStatistics
} from "@app/core/state/vendor-statistics/vendor-statistics.actions";

@Component({
  selector: 'app-list-vendor-colis',
  templateUrl: './list-vendor-colis.component.html',
  styleUrl: './list-vendor-colis.component.css',
})
export class ListVendorColisComponent implements OnInit {
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
  fetching: boolean = true;
  actionShowing: boolean = false;
  tempColis?: ColisModel | null;


  constructor(protected store: Store<ColisStore>, private route: ActivatedRoute,
              private ramassageStore: Store<RamassageStore>,
              private cudService: CrudApiService<ColisModel>,
              private statisticsStoreStore: Store<VendorStatisticsStore>,
  ) {
    this.currentPage$ = this.store.select(colisCurrentPageSelector);
  }


  ngOnInit(): void {
    this.store.dispatch(loadColis());

    this.currentPage$.subscribe(currentPage => {
      this.colisListCurrentPage = currentPage.content;
      this.colisPaginationInfo.totalPages = currentPage.totalPages;
      this.fetching = false;
    });
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


  show() {
  }

  handelActions(colisItem: any) {
    this.tempColis = colisItem;
    this.actionShowing = !this.actionShowing;
  }

  edit() {
  }

  delete() {
  }


  hideActionDropDown() {
    this.actionShowing = false;
    this.tempColis = null;
  }

  requestPickup() {
    this.loading = true;
    this.sendRequestPickup().subscribe(colis => {
      this.store.dispatch(removeColis({colisId: colis.id, pageNumber: this.getPageFromUrl()}));
      this.store.select(colisCurrentPageSelector).subscribe(page => {
        this.colisListCurrentPage = page.content;
        this.colisPaginationInfo.totalPages = page.totalPages;
        this.fetching = false;
        this.actionShowing = false;
        this.loading = false;
      });

      this.ramassageStore.dispatch(addRamassage({colis: colis}));
      this.statisticsStoreStore.dispatch(addRamassageVendorStatistics());
      this.statisticsStoreStore.dispatch(removeColisVendorStatistics());


    })
  }


  sendRequestPickup(): Observable<ColisModel> {
    return this.cudService
      .endPoint(vendorEndpoints.COLIS)
      .subEndPoint(subEndpoints.PICKING_UP)
      .pathVariable(this.tempColis ? this.tempColis.id : '')
      .update(null);
  }


}
