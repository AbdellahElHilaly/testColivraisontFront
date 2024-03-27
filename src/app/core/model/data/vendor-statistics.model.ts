export interface VendorStatisticsModel{
    totalMesColis : number,
    totalColisRamassage : number,
    totalLivraison : number,
    totalReturn : number,

}

export class InitVendorStatisticsModel implements VendorStatisticsModel{
    totalMesColis = 0;
    totalColisRamassage = 0;
    totalLivraison = 0;
    totalReturn = 0;
}
