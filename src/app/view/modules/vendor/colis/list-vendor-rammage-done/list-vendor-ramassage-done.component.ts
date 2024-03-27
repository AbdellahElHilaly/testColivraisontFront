import {Component, OnInit} from '@angular/core';
import {ColisModel} from "@app/core/model/data/colis.model";
import {Observable} from "rxjs";
import {PageableModel} from "@app/core/model/pagination/pageable.model";
import {PaginationRouteInfoModel} from "@app/core/model/view/pagination-route.model";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {CrudApiService} from "@app/core/service/rest/crud-api.service";

import {updateColisSuccess} from "@app/core/state/colis/colis.actions";
import {subEndpoints, vendorEndpoints} from "@app/utils/env/api.env";
import {
  loadRamassageDone,
  paginateRamassageDone,
  removeRamassageDone, updateRamassageDone
} from "@app/core/state/ramassage-done/ramassage-done.actions";
import {RamassageDoneStore} from "@app/core/state/ramassage-done/ramassage-done.store";
import {
  ramassageDoneCurrentPageSelector,
  ramassageDonePageByNumberSelector
} from "@app/core/state/ramassage-done/ramassage-done.selector";
import {removeRamassage} from "@app/core/state/ramassage/ramassage.actions";

@Component({
  selector: 'app-list-vendor-ramassage-done',
  templateUrl: './list-vendor-ramassage-done.component.html',
  styleUrl: './list-vendor-ramassage-done.component.css'
})
export class ListVendorRamassageDoneComponent implements OnInit {
  colisListCurrentPage?: Array<ColisModel>;

  currentPage$: Observable<PageableModel<ColisModel>>;

  ramassagePaginationInfo: PaginationRouteInfoModel = {
    baseUrl: '/vendor/dashboard',
    outletName: 'ramassage_outlet',
    routeName: 'picked-up',
    paramName: 'colisPageNumber',
    totalPages: 0,
  };
  loading: boolean = false;
  fetching: boolean = true;
  actionShowing: boolean = false;
  tempColis?: ColisModel | null;


  constructor(protected store: Store<RamassageDoneStore>, private route: ActivatedRoute,
              private cudService: CrudApiService<ColisModel>
  ) {
    this.currentPage$ = this.store.select(ramassageDoneCurrentPageSelector);
  }


  ngOnInit(): void {
    this.store.dispatch(loadRamassageDone());

    this.currentPage$.subscribe(currentPage => {
      this.colisListCurrentPage = currentPage.content;
      this.ramassagePaginationInfo.totalPages = currentPage.totalPages;
      this.fetching = false;
    });
  }


  protected paginate(): void {
    this.loading = true;
    let page = this.getPageFromUrl();
    let pageFinder = this.store.select(ramassageDonePageByNumberSelector(page));
    pageFinder.subscribe(colisPage => {
      if (colisPage) {
        this.colisListCurrentPage = colisPage;
        this.loading = false;
      } else {
        this.store.dispatch(paginateRamassageDone({pageNumber: page}));
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
      this.store.dispatch(updateRamassageDone({colis: colis, pageNumber: this.getPageFromUrl()}));
      this.loading = false;
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
