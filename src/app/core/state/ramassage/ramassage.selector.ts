import {RamassageStore} from "@app/core/state/ramassage/ramassage.store";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const ramassageFeatureSelector = createFeatureSelector<RamassageStore>('ramassage');

export const ramassageCurrentPageSelector = createSelector(
  ramassageFeatureSelector,
  (colis) => colis.currentPage
)


export const ramassageTotalElementsSelector = createSelector(
  ramassageCurrentPageSelector,
  (currentPage) => currentPage.totalElements
)

export const ramassageTotalPagesSelector = createSelector(
  ramassageCurrentPageSelector,
  (currentPage) => currentPage.totalPages
)

export const ramassagePageListSelector = createSelector(
  ramassageFeatureSelector,
  (colis) => colis.pageList
)

export const ramassageCurrentPageLengthSelector = createSelector(
  ramassageCurrentPageSelector,
  (currentPage) => currentPage.content.length
)

export const ramassagePageListLengthSelector = createSelector(
  ramassagePageListSelector,
  (pageList) => pageList.length
)

export const ramassagePageByNumberSelector = (pageNumber: number) => createSelector(
  ramassagePageListSelector,
  (pageList) => pageList[pageNumber]
);

export const ramassageCurrentLastItemSelector = createSelector(
  ramassageCurrentPageSelector,
  (currentPage) => currentPage.content[currentPage.content.length - 1]
)


