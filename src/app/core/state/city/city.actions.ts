import {createAction, props} from "@ngrx/store";
import {CityModel} from "@app/core/model/data/enums/city.model";

export const loadCities = createAction(
  '[City] Load Cities'
);
export const loadCitiesSuccess = createAction(
  '[City] Load Cities Success', props<{ cities: Array<CityModel> }>()
);
export const loadCitiesFailure = createAction(
  '[City] Load Cities Failure', props<{ error: any }>()
);
