import {createAction, props} from "@ngrx/store";
import {PageableModel} from "@app/core/model/pagination/pageable.model";
import {ColisModel} from "@app/core/model/data/colis.model";

export const loadRamassage = createAction(
  '[Ramassage] Load Ramassage'
);

export const loadRamassageSuccess = createAction(
  '[Ramassage] Load Ramassage Success', props<{ colisPages: PageableModel<ColisModel> }>()
);


export const paginateRamassage = createAction(
  '[Ramassage] Paginate Ramassage', props<{ pageNumber: number }>()
);

export const paginateRamassageSuccess = createAction(
  '[Ramassage] Paginate Ramassage Success', props<{ colisPages: PageableModel<ColisModel>, pageNumber: number }>()
);


export const removeRamassage = createAction(
  '[Ramassage] Remove Ramassage', props<{ colisId: string , pageNumber: number }>()
);


export const addRamassage = createAction(
  '[Ramassage] Add Ramassage', props<{ colis: ColisModel }>()
);

