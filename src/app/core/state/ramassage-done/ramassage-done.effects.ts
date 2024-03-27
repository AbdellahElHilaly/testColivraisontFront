import {Injectable} from "@angular/core";
import {CrudApiService} from "@app/core/service/rest/crud-api.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {ColisModel} from "@app/core/model/data/colis.model";

import {map, mergeMap} from "rxjs";
import {subEndpoints, vendorEndpoints} from "@app/utils/env/api.env";
import {PageableModel} from "@app/core/model/pagination/pageable.model";
import {RamassageDoneStore} from "@app/core/state/ramassage-done/ramassage-done.store";
import {
  loadRamassageDone,
  loadRamassageDoneSuccess, paginateRamassageDone,
  paginateRamassageDoneSuccess
} from "@app/core/state/ramassage-done/ramassage-done.actions";

@Injectable()
export class RamassageDoneEffect {
  constructor(
    private crudApiService: CrudApiService<ColisModel>,
    private actions$: Actions,
    private store: Store<{ ramassageStore: RamassageDoneStore }>
  ) {
  }

  loadRamassageDone$ = createEffect(() => this.actions$.pipe(
    ofType(loadRamassageDone),
    mergeMap(() => this.crudApiService
      .endPoint(vendorEndpoints.COLIS)
      .subEndPoint(subEndpoints.PICKED_UP)
      .paginate(0)
      .pipe(
        map((colisPages: PageableModel<ColisModel>) => {
          return loadRamassageDoneSuccess({colisPages});
        })
      )
    )
  ));

  paginateRamassageDone$ = createEffect(() => this.actions$.pipe(
    ofType(paginateRamassageDone),
    mergeMap((action) => this.crudApiService
      .endPoint(vendorEndpoints.COLIS)
      .subEndPoint(subEndpoints.PICKED_UP)
      .paginate(action.pageNumber)
      .pipe(
        map((colisPages: PageableModel<ColisModel>) => {
          return paginateRamassageDoneSuccess({colisPages, pageNumber: action.pageNumber});
        })
      )
    )
  ));


}
