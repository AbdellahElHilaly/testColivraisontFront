import {RamassageStore} from "@app/core/state/ramassage/ramassage.store";
import {
  loadRamassage,
  loadRamassageSuccess, paginateRamassage,
  paginateRamassageSuccess
} from "@app/core/state/ramassage/ramassage.actions";
import {Injectable} from "@angular/core";
import {CrudApiService} from "@app/core/service/rest/crud-api.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {ColisModel} from "@app/core/model/data/colis.model";

import {map, mergeMap} from "rxjs";
import {subEndpoints, vendorEndpoints} from "@app/utils/env/api.env";
import {PageableModel} from "@app/core/model/pagination/pageable.model";

@Injectable()
export class RamassageEffect {
  constructor(
    private crudApiService: CrudApiService<ColisModel>,
    private actions$: Actions,
    private store: Store<{ ramassageStore: RamassageStore }>
  ) {
  }

  loadRamassage$ = createEffect(() => this.actions$.pipe(
    ofType(loadRamassage),
    mergeMap(() => this.crudApiService
      .endPoint(vendorEndpoints.COLIS)
      .subEndPoint(subEndpoints.PICKING_UP)
      .paginate(0)
      .pipe(
        map((colisPages: PageableModel<ColisModel>) => {
          return loadRamassageSuccess({colisPages});
        })
      )
    )
  ));

  paginateRamassage$ = createEffect(() => this.actions$.pipe(
    ofType(paginateRamassage),
    mergeMap((action) => this.crudApiService
      .endPoint(vendorEndpoints.COLIS)
      .subEndPoint(subEndpoints.PICKING_UP)
      .paginate(action.pageNumber)
      .pipe(
        map((colisPages: PageableModel<ColisModel>) => {
          return paginateRamassageSuccess({colisPages, pageNumber: action.pageNumber});
        })
      )
    )
  ));


}
