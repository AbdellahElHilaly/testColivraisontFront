import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ColisStore} from "@app/core/state/colis/colis.store";

export const colisFeatureSelector = createFeatureSelector<ColisStore>('colis');

export const colisCurrentPageSelector = createSelector(
  colisFeatureSelector,
  (colis) => colis.currentPage
)


export const colisTotalElementsSelector = createSelector(
  colisCurrentPageSelector,
  (currentPage) => currentPage.totalElements
)

export const colisTotalPagesSelector = createSelector(
  colisCurrentPageSelector,
  (currentPage) => currentPage.totalPages
)

export const colisPageListSelector = createSelector(
  colisFeatureSelector,
  (colis) => colis.pageList
)

export const colisCurrentPageLengthSelector = createSelector(
  colisCurrentPageSelector,
  (currentPage) => currentPage.content.length
)

export const colisPageListLengthSelector = createSelector(
  colisPageListSelector,
  (pageList) => pageList.length
)

export const colisPageByNumberSelector = (pageNumber: number) => createSelector(
  colisPageListSelector,
  (pageList) => pageList[pageNumber]
);




