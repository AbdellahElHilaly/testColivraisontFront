import {ProfileStore} from "@app/core/state/profile/profile.store";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const profileFeatureSelector = createFeatureSelector<ProfileStore>('profile');

export const profileSelector = createSelector(
  profileFeatureSelector,
  (state: ProfileStore) => state.profile
);



export const isGetMiniProfileSelector = createSelector(
  profileFeatureSelector,
  (state: ProfileStore) => state.isGetMiniProfile
);

export const isGetProfileSelector = createSelector(
  profileFeatureSelector,
  (state: ProfileStore) => state.isGetProfile
);

export const roleSelector = createSelector(
  profileFeatureSelector,
  (state: ProfileStore) => state.profile.role
);
