import {createReducer, on} from "@ngrx/store";
import {initialRamassageState} from "@app/core/state/ramassage/ramassage.store";
import * as RamassageActions from "@app/core/state/ramassage/ramassage.actions";
import {paginationEnv} from "@app/utils/env/pagination.env";


export const ramassageReducer = createReducer(
    initialRamassageState,

    on(RamassageActions.loadRamassageSuccess, (state, {colisPages}) => {
      const tempColisPages = new Array(colisPages.totalPages).fill(null);
      tempColisPages[0] = colisPages.content;
      return {
        ...state,
        currentPage: colisPages,
        pageList: tempColisPages,
      };
    }),

    on(RamassageActions.paginateRamassageSuccess, (state, {colisPages, pageNumber}) => {
      const tempColisPages = [...state.pageList];
      tempColisPages[pageNumber] = colisPages.content;
      return {
        ...state,
        currentPage: colisPages,
        pageList: tempColisPages,
      };
    }),


    on(RamassageActions.removeRamassage, (state, {colisId, pageNumber}) => {
      let pageList = [...state.pageList];
      let totalPages = state.currentPage.totalPages;
      let totalElements = state.currentPage.totalElements;
      let pageToItemRemove = [...pageList[pageNumber]];
      let indexToRemove = pageToItemRemove.findIndex(colis => colis.id === colisId);


      if (!pageList[1] && indexToRemove !== -1) {
        pageToItemRemove.splice(indexToRemove, 1);
        pageList[0] = pageToItemRemove;
        totalElements--;
      } else if (totalPages == 1 && indexToRemove !== -1) {
        pageToItemRemove.splice(indexToRemove, 1);
        pageList[0] = pageToItemRemove;
        totalElements--;
      } else if (indexToRemove !== -1) {
        let lastPage = [...pageList[pageList.length - 1]];
        for (let i = 0; i < pageList.length; i++) {
          if (pageList[i] === null) {
            lastPage = [...pageList[i - 1]];
            break;
          }
        }


        pageToItemRemove[indexToRemove] = lastPage[lastPage.length - 1];

        pageList[pageNumber] = pageToItemRemove;

        lastPage = lastPage.slice(0, -1);
        totalElements--;

        pageList[pageList.length - 1] = lastPage;

        if (pageList[pageList.length - 1].length === 0) {
          totalPages--;
        }

      }


      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          content: pageToItemRemove,
          totalElements: totalElements,
          totalPages: totalPages
        },
        pageList: pageList
      };
    }),


    on(RamassageActions.addRamassage, (state, {colis}) => {
      const newTotalElements = state.currentPage.totalElements + 1;
      const newPageList = [...state.pageList];
      let newTotalPages = state.currentPage.totalPages;

      const lastPage = newPageList[newPageList.length - 1];

      if (lastPage && lastPage.length < paginationEnv.SIZE) {
        newPageList[newPageList.length - 1] = [...lastPage, colis];
      } else {
        newPageList.push([colis]);
        newTotalPages++;
      }

      return {
        ...state,
        currentPage: {
          ...state.currentPage,
          totalElements: newTotalElements,
          content: newPageList[newPageList.length - 1],
          totalPages: newTotalPages,
        },
        pageList: newPageList,
      };
    }),
  )
;

