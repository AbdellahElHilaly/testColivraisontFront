import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {VendorStatisticsStore} from "@app/core/state/vendor-statistics/vendor-statistics.store";
import {vendorStatisticsSelector} from "@app/core/state/vendor-statistics/vendor-statistics.selector";
import {loadVendorStatistics} from "@app/core/state/vendor-statistics/vendor-statistics.actions";
import {CardStatisticsModel} from "@app/core/model/view/card-statistics.model";
import {VendorStatisticsModel} from "@app/core/model/data/vendor-statistics.model";

@Component({
  selector: 'app-vendor-statistics',
  templateUrl: './vendor-statistics.component.html',
  styleUrl: './vendor-statistics.component.css'
})

export class VendorStatisticsComponent implements OnInit {
  vendorStatistics$;
  statistics?: VendorStatisticsModel;
  cardListStatistics?: Array<CardStatisticsModel>;
  hasData: boolean = false;

  constructor(private store: Store<VendorStatisticsStore>) {
    this.vendorStatistics$ = this.store.select(vendorStatisticsSelector);
  }

  ngOnInit(): void {
    this.store.dispatch(loadVendorStatistics());
    this.vendorStatistics$.subscribe(vendorStatistics => {
      this.statistics = vendorStatistics;
      this.hasData = true;
      this.cardListStatistics = [
        {
          title: 'Mes Total Colis',
          value: vendorStatistics.totalMesColis,
          iconName: 'package',
        },
        {
          title: 'Total Colis Ramassage',
          value: vendorStatistics.totalColisRamassage,
          iconName: 'rammassage',
        },
        {
          title: 'Total Colis Livraison',
          value: vendorStatistics.totalLivraison,
          iconName: 'package-v',
        },
        {
          title: 'Total Colis Retour',
          value: vendorStatistics.totalReturn,
          iconName: 'package-x',
        },
      ];

    });
  }
}


