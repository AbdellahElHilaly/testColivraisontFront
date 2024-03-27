import {createReducer, on} from "@ngrx/store";
import {initialVendorStatisticsState} from "@app/core/state/vendor-statistics/vendor-statistics.store";
import * as Actions from "@app/core/state/vendor-statistics/vendor-statistics.actions";
import {addColisVendorStatistics} from "@app/core/state/vendor-statistics/vendor-statistics.actions";

export const VendorStatisticsReducer = createReducer(
  initialVendorStatisticsState,

  on(Actions.loadVendorStatisticsSuccess, (state, {vendorStatistics}) => {
    return {
      ...state,
      vendorStatistics: vendorStatistics,
      hasData: true
    };
  }),

  on(Actions.addColisVendorStatistics, (state) => {
    return {
      ...state,
      vendorStatistics: {
        ...state.vendorStatistics,
        totalMesColis: state.vendorStatistics.totalMesColis + 1
      }
    };
  }),

  on(Actions.removeColisVendorStatistics, (state) => {
    return {
      ...state,
      vendorStatistics: {
        ...state.vendorStatistics,
        totalMesColis: state.vendorStatistics.totalMesColis - 1
      }
    };
  }),

  on(Actions.addRamassageVendorStatistics, (state) => {
    return {
      ...state,
      vendorStatistics: {
        ...state.vendorStatistics,
        totalColisRamassage: state.vendorStatistics.totalColisRamassage + 1
      }
    };
  }),

  on(Actions.removeRamassageVendorStatistics, (state) => {
    return {
      ...state,
      vendorStatistics: {
        ...state.vendorStatistics,
        totalColisRamassage: state.vendorStatistics.totalColisRamassage - 1
      }
    };
  }),
);
