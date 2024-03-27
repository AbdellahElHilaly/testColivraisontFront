import {Component, OnInit} from '@angular/core';
import {ColisModel} from "@app/core/model/data/colis.model";
import {Observable} from "rxjs";
import {PageableModel} from "@app/core/model/pagination/pageable.model";
import {PaginationRouteInfoModel} from "@app/core/model/view/pagination-route.model";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {CrudApiService} from "@app/core/service/rest/crud-api.service";
import {subEndpoints, vendorEndpoints} from "@app/utils/env/api.env";
import {RamassageStore} from "@app/core/state/ramassage/ramassage.store";
import {
  ramassageCurrentPageSelector, ramassagePageByNumberSelector
} from "@app/core/state/ramassage/ramassage.selector";
import {loadRamassage, paginateRamassage, removeRamassage} from "@app/core/state/ramassage/ramassage.actions";
import {ColisStore} from "@app/core/state/colis/colis.store";
import {createColisSuccess} from "@app/core/state/colis/colis.actions";
import {VendorStatisticsStore} from "@app/core/state/vendor-statistics/vendor-statistics.store";
import {
  addColisVendorStatistics,
  removeRamassageVendorStatistics
} from "@app/core/state/vendor-statistics/vendor-statistics.actions";

@Component({
  selector: 'app-list-vendor-ramassage',
  templateUrl: './list-vendor-demmande-ramassage.component.html',
  styleUrl: './list-vendor-demmande-ramassage.component.css'
})
export class ListVendorDemmandeRamassageComponent implements OnInit {
  colisListCurrentPage?: Array<ColisModel>;

  currentPage$: Observable<PageableModel<ColisModel>>;

  ramassagePaginationInfo: PaginationRouteInfoModel = {
    baseUrl: '/vendor/dashboard',
    outletName: 'ramassage_outlet',
    routeName: 'demandes',
    paramName: 'colisPageNumber',
    totalPages: 0,
  };

  loading: boolean = false;
  fetching: boolean = true;
  actionShowing: boolean = false;
  tempColis?: ColisModel | null;


  constructor(protected store: Store<RamassageStore>,
              private colisStoreStore: Store<ColisStore>,
              private route: ActivatedRoute,
              private cudService: CrudApiService<ColisModel>,
              private statisticsStoreStore: Store<VendorStatisticsStore>,

  ) {
    this.currentPage$ = this.store.select(ramassageCurrentPageSelector);
  }


  ngOnInit(): void {
    this.store.dispatch(loadRamassage());

    this.currentPage$.subscribe(currentPage => {
      this.colisListCurrentPage = currentPage.content;
      this.ramassagePaginationInfo.totalPages = currentPage.totalPages;
      this.fetching = false;
    });
  }


  protected paginate(): void {
    this.loading = true;
    let page = this.getPageFromUrl();
    let pageFinder = this.store.select(ramassagePageByNumberSelector(page));
    pageFinder.subscribe(colisPage => {
      if (colisPage) {
        this.colisListCurrentPage = colisPage;
        this.loading = false;
      } else {
        this.store.dispatch(paginateRamassage({pageNumber: page}));
      }
    });

  }

  private getPageFromUrl(): number {
    let pageNumber = 0;
    this.route.params.subscribe(params => {
      pageNumber = +params[this.ramassagePaginationInfo.paramName];
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

  cancelPickup() {
    this.loading = true;
    this.sendRequestCancelPickup().subscribe(colis => {
      this.store.dispatch(removeRamassage({colisId: colis.id, pageNumber: this.getPageFromUrl()}))
      this.loading = false;

      this.store.select(ramassageCurrentPageSelector).subscribe(currentPage => {
        this.colisListCurrentPage = currentPage.content;
        this.ramassagePaginationInfo.totalPages = currentPage.totalPages;
        this.fetching = false;
        this.actionShowing = false;
        this.loading = false;
      });

      this.colisStoreStore.dispatch(createColisSuccess({colis}));
      this.statisticsStoreStore.dispatch(addColisVendorStatistics());
      this.statisticsStoreStore.dispatch(removeRamassageVendorStatistics());

    })
  }


  sendRequestCancelPickup(): Observable<ColisModel> {
    return this.cudService
      .endPoint(vendorEndpoints.COLIS)
      .subEndPoint(subEndpoints.CANCEL_PICKED_UP)
      .pathVariable(this.tempColis ? this.tempColis.id : '')
      .update(null);
  }


}
