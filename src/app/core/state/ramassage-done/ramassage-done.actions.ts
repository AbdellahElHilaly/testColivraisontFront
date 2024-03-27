import {createAction, props} from "@ngrx/store";
import {PageableModel} from "@app/core/model/pagination/pageable.model";
import {ColisModel} from "@app/core/model/data/colis.model";

export const loadRamassageDone = createAction(
  '[RamassageDone] Load Ramassage'
);

export const loadRamassageDoneSuccess = createAction(
  '[RamassageDone] Load Ramassage Success', props<{ colisPages: PageableModel<ColisModel> }>()
);


export const paginateRamassageDone = createAction(
  '[RamassageDone] Paginate Ramassage', props<{ pageNumber: number }>()
);

export const paginateRamassageDoneSuccess = createAction(
  '[RamassageDone] Paginate Ramassage Success', props<{ colisPages: PageableModel<ColisModel>, pageNumber: number }>()
);


export const removeRamassageDone = createAction(
  '[RamassageDone] Remove Ramassage', props<{ colisId: string }>()
);

export const updateRamassageDone = createAction(
  '[RamassageDone] Update Ramassage',
  props<{ colis: ColisModel, pageNumber: number }>()
);


