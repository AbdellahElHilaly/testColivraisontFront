import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CityStore} from "@app/core/state/city/city.store";

export const cityFeatureSelector = createFeatureSelector<CityStore>('city');

export const citiesSelector = createSelector(
  cityFeatureSelector,
  (state: CityStore) => state.cities
);

export const hasDataSelector = createSelector(
  cityFeatureSelector,
  (state: CityStore) => state.hasData
);
