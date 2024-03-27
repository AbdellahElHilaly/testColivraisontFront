import {createFeatureSelector, createSelector} from "@ngrx/store";
import {VendorStatisticsStore} from "@app/core/state/vendor-statistics/vendor-statistics.store";

export const vendorStatisticsFeatureSelector = createFeatureSelector<VendorStatisticsStore>('vendorStatistics');

export const vendorStatisticsSelector = createSelector(
  vendorStatisticsFeatureSelector,
  (store) => store.vendorStatistics
)


export const vendorStatisticsHasDataSelector = createSelector(
  vendorStatisticsFeatureSelector,
  (vendorStatistics) => vendorStatistics.hasData
)
