import {createAction, props} from "@ngrx/store";
import {ColisModel} from "@app/core/model/data/colis.model";
import {PageableModel} from "@app/core/model/pagination/pageable.model";

export const loadColis = createAction(
  '[Colis] Load Colis'
);
export const loadColisSuccess = createAction(
  '[Colis] Load Colis Success', props<{ colisPages: PageableModel<ColisModel> }>()
);
export const loadColisFailure = createAction(
  '[Colis] Load Colis Failure', props<{ error: any }>()
);



export const paginateColis = createAction(
  '[Colis] Paginate Colis', props<{ pageNumber: number }>()
);

export const paginateColisSuccess = createAction(
  '[Colis] Paginate Colis Success', props<{ colisPages: PageableModel<ColisModel>, pageNumber: number }>()
);

export const paginateColisFailure = createAction(
  '[Colis] Paginate Colis Failure', props<{ error: any }>()
);


export const createColis = createAction(
  '[Colis] Create Colis', props<{ colis: ColisModel }>()
);

export const createColisSuccess = createAction(
  '[Colis] Create Colis Success', props<{ colis: ColisModel }>()
);

export const createColisFailure = createAction(
  '[Colis] Create Colis Failure', props<{ error: any }>()
);
