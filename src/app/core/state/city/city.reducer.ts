import {createReducer, on} from "@ngrx/store";
import {initialCityState} from "@app/core/state/city/city.store";
import * as CityActions from "@app/core/state/city/city.actions";


export const cityReducer = createReducer(
  initialCityState,

  on(CityActions.loadCitiesSuccess, (state, {cities}) => {
    return {
      ...state,
      hasData: true,
      cities: cities,
    };

  }),


  on(CityActions.loadCitiesFailure, (state, {error}) => {
    return {
      ...state,
      error: error,
    };

  }),
)


