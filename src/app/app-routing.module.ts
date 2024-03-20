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

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: '404', component: RouteNotFoundComponent},


  {
    path: 'vendor/dashboard',
    component: VendorDashboardComponent,
    children: [

      {path: 'statistics', component: VendorStatisticsComponent, outlet: 'statistics_outlet'},

      {
        path: 'list/:colisPageNumber',
        component: ListVendorColisComponent,
        outlet: 'colis_outlet',
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
