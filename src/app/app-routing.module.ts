import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./view/pages/home-page/home-page.component";
import {LoginPageComponent} from "./view/pages/login-page/login-page.component";
import {ErrorPageComponent} from "@app/view/pages/error-page/error-page.component";
import {UserProfileComponent} from "@app/view/modules/user/user-profile/user-profile.component";
import {VendorDashboardComponent} from "@app/view/dashboards/vendor-dashboard/vendor-dashboard.component";
import {RouteNotFoundComponent} from "@app/view/pages/errors/route-not-found/route-not-found.component";
import {VendorStatisticsComponent} from "@app/view/modules/vendor/vendor-statistics/vendor-statistics.component";
import {ListVendorColisComponent} from "@app/view/modules/vendor/colis/list-vendor-colis/list-vendor-colis.component";
import {AuthGuard} from "@app/core/guards/auth.guard";
import {AuthorityGuard} from "@app/core/guards/authority .guard";
import {
  ListVendorDemmandeRamassageComponent
} from "@app/view/modules/vendor/colis/list-vendor-ramassage/list-vendor-demmande-ramassage.component";
import {
  ListVendorRamassageDoneComponent
} from "@app/view/modules/vendor/colis/list-vendor-rammage-done/list-vendor-ramassage-done.component";

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '404', component: RouteNotFoundComponent},



  {
    path: 'vendor/dashboard',
    component: VendorDashboardComponent,
    canActivate: [AuthGuard, AuthorityGuard],
    data: {requiredRoles: ['VENDOR'], requiredPermissions: []},
    children: [
      {
        path: 'statistics',
        component: VendorStatisticsComponent,
        outlet: 'head_outlet',
      },
      {
        path: 'list/:colisPageNumber',
        component: ListVendorColisComponent,
        outlet: 'colis_outlet',
      },
      {
        path: 'demandes/:colisPageNumber',
        component: ListVendorDemmandeRamassageComponent,
        outlet: 'ramassage_outlet',
      },
      {
        path: 'picked-up/:colisPageNumber',
        component: ListVendorRamassageDoneComponent,
        outlet: 'ramassage_outlet',
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: UserProfileComponent,
        outlet: 'head_outlet',
      },


    ]
  },

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/404'}
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'disabled',
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
