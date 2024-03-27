import {Injectable} from "@angular/core";
import {CrudApiService} from "@app/core/service/rest/crud-api.service";
import {UserModel} from "@app/core/model/data/auth/user.model";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {vendorEndpoints} from "@app/utils/env/api.env";
import {CityStore} from "@app/core/state/city/city.store";
import {loadCities, loadCitiesSuccess} from "@app/core/state/city/city.actions";
import {map, mergeMap} from "rxjs";
import {hasDataSelector} from "@app/core/state/city/city.selector";

@Injectable()
export class CityEffect {
  constructor(
    private crudApiService: CrudApiService<UserModel>,
    private actions$: Actions,
    private store: Store<{ cityStore: CityStore }>
  ) {

  }


  loadCities$ = createEffect(() => this.actions$.pipe(
    ofType(loadCities),
    mergeMap(() => this.store.select(hasDataSelector).pipe(
      mergeMap(hasData => {
        if (!hasData) {
          return this.crudApiService
            .endPoint(vendorEndpoints.CITY)
            .read()
            .pipe(
              map((cities: any) => {
                return loadCitiesSuccess({cities});
              })
            );
        } else {
          return [];
        }
      })
    ))
  ));


}
