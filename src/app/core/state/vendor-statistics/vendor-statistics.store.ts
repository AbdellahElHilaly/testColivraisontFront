import {InitVendorStatisticsModel, VendorStatisticsModel} from "@app/core/model/data/vendor-statistics.model";

export interface VendorStatisticsStore {
    vendorStatistics: VendorStatisticsModel;
    hasData: boolean;
}

export const initialVendorStatisticsState: VendorStatisticsStore = {
    vendorStatistics: new InitVendorStatisticsModel(),
    hasData: false
}
