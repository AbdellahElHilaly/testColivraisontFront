
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RamassageDoneStore} from "@app/core/state/ramassage-done/ramassage-done.store";
import {ramassagePageListSelector} from "@app/core/state/ramassage/ramassage.selector";

export const ramassageDoneFeatureSelector = createFeatureSelector<RamassageDoneStore>('ramassageDone');

export const ramassageDoneCurrentPageSelector = createSelector(
  ramassageDoneFeatureSelector,
  (colis) => colis.currentPage
)


export const ramassageDoneTotalElementsSelector = createSelector(
  ramassageDoneCurrentPageSelector,
  (currentPage) => currentPage.totalElements
)

export const ramassageDoneTotalPagesSelector = createSelector(
  ramassageDoneCurrentPageSelector,
  (currentPage) => currentPage.totalPages
)

export const ramassageDonePageListSelector = createSelector(
  ramassageDoneFeatureSelector,
  (colis) => colis.pageList
)

export const ramassageDoneCurrentPageLengthSelector = createSelector(
  ramassageDoneCurrentPageSelector,
  (currentPage) => currentPage.content.length
)

export const ramassageDonePageListLengthSelector = createSelector(
  ramassageDonePageListSelector,
  (pageList) => pageList.length
)

export const ramassageDonePageByNumberSelector = (pageNumber: number) => createSelector(
  ramassageDonePageListSelector,
  (pageList) => pageList[pageNumber]
);



export const ramassageDoneGlobalLastItemSelector = createSelector(
  ramassagePageListSelector,
  (pageList) => {
    let lastPage = pageList[pageList.length - 1];
    return lastPage ? lastPage[lastPage.length - 1] : null;
  }
)
