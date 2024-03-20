import {createReducer, on} from "@ngrx/store";
import {initialColisState} from "@app/core/state/colis/colis.store";
import * as ColisActions from "@app/core/state/colis/colis.actions";
import {paginationEnv} from "@app/utils/env/pagination.env";


export const colisReducer = createReducer(
  initialColisState,

  on(ColisActions.loadColisSuccess, (state, {colisPages}) => {
    const tempColisPages = new Array(colisPages.totalPages).fill(null);
    tempColisPages[0] = colisPages.content;
    return {
      ...state,
      currentPage: colisPages,
      pageList: tempColisPages,
    };
  }),

  on(ColisActions.loadColisFailure, (state, {error}) => {
    return {
      ...state,
      error: error,
    };
  }),

  on(ColisActions.paginateColisSuccess, (state, {colisPages, pageNumber}) => {
    const tempColisPages = [...state.pageList];
    tempColisPages[pageNumber] = colisPages.content;
    return {
      ...state,
      currentPage: colisPages,
      pageList: tempColisPages,
    };
  }),

  on(ColisActions.paginateColisFailure, (state, {error}) => {
    return {
      ...state,
      error: error,
    };
  }),


  on(ColisActions.createColisSuccess, (state, {colis}) => {
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


  on(ColisActions.createColisFailure, (state, {error}) => {
    return {
      ...state,
      error: error,
    };
  }),
)
