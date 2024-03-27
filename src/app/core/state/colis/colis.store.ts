import {ColisModel} from "@app/core/model/data/colis.model";
import {initPageableModel, PageableModel} from "@app/core/model/pagination/pageable.model";

export interface ColisStore {
  currentPage: PageableModel<ColisModel>;
  pageList: Array<Array<ColisModel>>;
}

export const initialColisState: ColisStore = {
  currentPage: new initPageableModel<ColisModel>(),
  pageList: new Array<Array<ColisModel>>(),
}
