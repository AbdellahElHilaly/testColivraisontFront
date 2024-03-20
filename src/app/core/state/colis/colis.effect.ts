import {Injectable} from "@angular/core";
import {CrudApiService} from "@app/core/service/rest/crud-api.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {ColisModel} from "@app/core/model/data/colis.model";
import {ColisStore} from "@app/core/state/colis/colis.store";
import {
  createColis, createColisSuccess,
  loadColis,
  loadColisSuccess,
  paginateColis,
  paginateColisSuccess
} from "@app/core/state/colis/colis.actions";
import {map, mergeMap} from "rxjs";
import {vendorEndpoints} from "@app/utils/env/api.env";
import {PageableModel} from "@app/core/model/pagination/pageable.model";

@Injectable()
export class ColisEffect {
  constructor(
    private crudApiService: CrudApiService<ColisModel>,
    private actions$: Actions,
    private store: Store<{ colisStore: ColisStore }>
  ) {
  }

  loadColis$ = createEffect(() => this.actions$.pipe(
    ofType(loadColis),
    mergeMap(() => this.crudApiService
      .endPoint(vendorEndpoints.COLIS)
      .paginate(0)
      .pipe(
        map((colisPages: any) => {
          console.log('loadColis effect');
          return loadColisSuccess({colisPages});
        })
      )
    )
  ));


  paginateColis$ = createEffect(() => this.actions$.pipe(
    ofType(paginateColis),
    mergeMap((action) => this.crudApiService
      .endPoint(vendorEndpoints.COLIS)
      .paginate(action.pageNumber)
      .pipe(
        map((colisPages: PageableModel<ColisModel>) => {
          return paginateColisSuccess({colisPages, pageNumber: action.pageNumber});
        })
      )
    )
  ));


  createColis$ = createEffect(() => this.actions$.pipe(
    ofType(createColis),
    mergeMap((action) => this.crudApiService
      .endPoint(vendorEndpoints.COLIS)
      .create(action.colis)
      .pipe(
        map((colis: ColisModel) => {
          return createColisSuccess({colis});
        })
      )
    )
  ));


}
