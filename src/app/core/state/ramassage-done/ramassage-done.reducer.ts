import {createReducer, on} from "@ngrx/store";
import {initialRamassageDoneState} from "@app/core/state/ramassage-done/ramassage-done.store";
import * as RamassageDoneActions from "@app/core/state/ramassage-done/ramassage-done.actions";
import {ramassageDoneGlobalLastItemSelector} from "@app/core/state/ramassage-done/ramassage-done.selector";


export const ramassageDoneReducer = createReducer(
    initialRamassageDoneState,

    on(RamassageDoneActions.loadRamassageDoneSuccess, (state, {colisPages}) => {
      const tempColisPages = new Array(colisPages.totalPages).fill(null);
      tempColisPages[0] = colisPages.content;
      return {
        ...state,
        currentPage: colisPages,
        pageList: tempColisPages,
      };
    }),

    on(RamassageDoneActions.paginateRamassageDoneSuccess, (state, {colisPages, pageNumber}) => {
      const tempColisPages = [...state.pageList];
      tempColisPages[pageNumber] = colisPages.content;
      return {
        ...state,
        currentPage: colisPages,
        pageList: tempColisPages,
      };
    }),

    on(RamassageDoneActions.removeRamassageDone, (state, {colisId}) => {

      const currentPageIndex = state.currentPage.content.findIndex(colis => colis.id === colisId);
      const lastItem = ramassageDoneGlobalLastItemSelector(state);
      let currentPageContent = [...state.currentPage.content];
      let pageList = [...state.pageList];
      let totalPages = state.currentPage.totalPages;
      let totalElements = state.currentPage.totalElements;

      if (lastItem) {
        currentPageContent[currentPageIndex] = lastItem;
        let lastPage = pageList[pageList.length - 1];
        if (lastPage && lastPage.length > 0) {
          lastPage = lastPage.slice(0, -1);
          pageList[pageList.length - 1] = lastPage;
          totalElements--;
          if (lastPage.length === 0) {
            pageList = pageList.slice(0, -1);
            totalPages--;
          }
        }
      }

      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          content: currentPageContent,
          totalElements: totalElements,
          totalPages: totalPages
        },
        pageList: pageList
      };
    }),
    on(RamassageDoneActions.updateRamassageDone, (state, {colis, pageNumber}) => {
      const currentPageContent = [...state.currentPage.content];
      let pageList = [...state.pageList];

      if (pageList[pageNumber]) {
        let newPage = [...pageList[pageNumber]];

        const colisIndex = newPage.findIndex(c => c.id === colis.id);

        if (colisIndex !== -1) {
          newPage[colisIndex] = colis;
        }

        pageList[pageNumber] = newPage;
      }

      const currentPageIndex = currentPageContent.findIndex(c => c.id === colis.id);
      if (currentPageIndex !== -1) {
        currentPageContent[currentPageIndex] = colis;
      }

      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          content: currentPageContent
        },
        pageList: pageList
      };
    })
  )
;


