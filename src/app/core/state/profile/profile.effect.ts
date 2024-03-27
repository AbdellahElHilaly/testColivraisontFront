import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  getProfileFailure,
  getProfileSuccess,
  loadProfile
} from "@app/core/state/profile/profile.actions";
import {map, mergeMap, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {CrudApiService} from "@app/core/service/rest/crud-api.service";
import {UserModel} from "@app/core/model/data/auth/user.model";
import {authEndpoints, vendorEndpoints} from "@app/utils/env/api.env";

import {isGetProfileSelector} from '@app/core/state/profile/profile.selector';
import {Store} from "@ngrx/store";
import {ProfileStore} from "@app/core/state/profile/profile.store";


@Injectable()
export class ProfileEffect {
  constructor(
    private crudApiService: CrudApiService<UserModel>,
    private actions$: Actions,
    private store: Store<{ profile: ProfileStore }>
  ) {
  }

  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(loadProfile),
    mergeMap(() => this.store.select(isGetProfileSelector).pipe(
      mergeMap(isGetProfile => {
        if (!isGetProfile) {
          return this.crudApiService
            .endPoint(authEndpoints.PROFILE)
            .read().pipe(
            map((profile: any) => {
              this.store.dispatch(getProfileSuccess({profile}));
              return getProfileSuccess({profile});
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
