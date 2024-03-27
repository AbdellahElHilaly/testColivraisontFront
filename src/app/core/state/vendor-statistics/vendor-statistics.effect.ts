import {Injectable} from "@angular/core";
import {CrudApiService} from "@app/core/service/rest/crud-api.service";
import {ColisModel} from "@app/core/model/data/colis.model";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {VendorStatisticsStore} from "@app/core/state/vendor-statistics/vendor-statistics.store";
import {
  loadVendorStatistics, loadVendorStatisticsSuccess,
} from "@app/core/state/vendor-statistics/vendor-statistics.actions";
import {authEndpoints, subEndpoints, vendorEndpoints} from "@app/utils/env/api.env";
import {map, mergeMap, of} from "rxjs";
import {getProfileFailure, getProfileSuccess, loadProfile} from "@app/core/state/profile/profile.actions";
import {isGetProfileSelector} from "@app/core/state/profile/profile.selector";
import {catchError} from "rxjs/operators";
import {vendorStatisticsHasDataSelector} from "@app/core/state/vendor-statistics/vendor-statistics.selector";
import {VendorStatisticsModel} from "@app/core/model/data/vendor-statistics.model";

@Injectable()
export class VendorStatisticsEffect {
  constructor(
    private crudApiService: CrudApiService<VendorStatisticsModel>,
    private actions$: Actions,
    private store: Store<{ vendorStatisticsStore: VendorStatisticsStore }>
  ) {
  }

  loadVendorStatistics$ = createEffect(() => this.actions$.pipe(
    ofType(loadVendorStatistics),
    mergeMap(() => this.store.select(vendorStatisticsHasDataSelector).pipe(
      mergeMap(hasData => {
        if (!hasData) {
          return this.crudApiService
            .endPoint(vendorEndpoints.COLIS)
            .subEndPoint(subEndpoints.STATISTICS)
            .read().pipe(
              map((vendorStatistics: VendorStatisticsModel) => {
                return loadVendorStatisticsSuccess({vendorStatistics});
              }),
              catchError(error => of(getProfileFailure({error})))
            );
        } else {
          return of();
        }
      })
    ))
  ));

}
