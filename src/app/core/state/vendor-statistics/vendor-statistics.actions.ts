import {createAction, props} from '@ngrx/store';
import {VendorStatisticsModel} from "@app/core/model/data/vendor-statistics.model";

export const loadVendorStatistics = createAction(
  '[VendorStatistics] Load VendorStatistics'
);

export const loadVendorStatisticsSuccess = createAction(
  '[Vendor Statistics] Load Vendor Statistics Success',
  props<{ vendorStatistics: VendorStatisticsModel }>()
);

export const addColisVendorStatistics = createAction(
  '[Vendor Statistics] Add Colis Vendor Statistics',
);

export const removeColisVendorStatistics = createAction(
  '[Vendor Statistics] Remove Colis Vendor Statistics',
);

export const addRamassageVendorStatistics = createAction(
  '[Vendor Statistics] Add Ramassage Vendor Statistics',
);

export const removeRamassageVendorStatistics = createAction(
  '[Vendor Statistics] Remove Ramassage Vendor Statistics',
);





