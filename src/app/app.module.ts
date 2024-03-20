import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './view/pages/home-page/home-page.component';
import {HomeNavbarComponent} from './view/shared/layouts/home-navbar/home-navbar.component';
import {HomeButtonComponent} from './view/shared/widgets/buttons/home-button/home-button.component';
import {HomeHeaderComponent} from './view/shared/layouts/home-header/home-header.component';
import {IconHelperComponent} from './view/shared/helper/icon-helper/icon-helper.component';
import {HomeServiceSectionComponent} from './view/shared/sections/home-service-section/home-service-section.component';
import {HomeServiceCardComponent} from './view/shared/widgets/cards/home-service-card/home-service-card.component';
import {StatisticSectionComponent} from './view/shared/sections/statistic-section/statistic-section.component';
import {StatisticPieceComponent} from './view/shared/widgets/pieces/statistic-piece/statistic-piece.component';
import {LoginPageComponent} from './view/pages/login-page/login-page.component';
import {LoginFormComponent} from './view/shared/forms/login-form/login-form.component';
import {HomeSpinnerComponent} from './view/shared/widgets/pieces/home-spinner/home-spinner.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {GlobalErrorHandler} from "@app/core/exception/global-error-handler.service";
import {ErrorPageComponent} from './view/pages/error-page/error-page.component';
import {NotificationComponent} from './view/shared/widgets/pieces/notification/notification.component';
import {NavProfileComponent} from "@app/view/shared/widgets/pieces/nav-profile/nav-profile.component";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AuthInterceptor} from "@app/core/interceptors/auth.interceptor";
import {UserProfileComponent} from './view/modules/user/user-profile/user-profile.component';
import {RefreshTokenInterceptor} from "@app/core/interceptors/refresh-token.interceptor";
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {profileReducer} from "@app/core/state/profile/profile.reducer";
import {ProfileEffect} from "@app/core/state/profile/profile.effect";
import {VendorDashboardComponent} from './view/dashboards/vendor-dashboard/vendor-dashboard.component';
import {
  DarkLightModeButtonComponent
} from './view/shared/widgets/buttons/dark-light-mode-button/dark-light-mode-button.component';
import {InputPasswordComponent} from './view/shared/widgets/inputs/input-password/input-password.component';
import {NavDashboardComponent} from './view/shared/layouts/nav-dashboard/nav-dashboard.component';
import {SidebarComponent} from './view/shared/layouts/sidebar/sidebar.component';
import {
  DashboardPrimarySectionComponent
} from './view/shared/sections/dashboard-primary-section/dashboard-primary-section.component';
import {
  DashboardSecondarySectionComponent
} from './view/shared/sections/dashboard-secondary-section/dashboard-secondary-section.component';
import {DashboardCardComponent} from './view/shared/widgets/cards/dashboard-card/dashboard-card.component';
import {
  DashboardHeadSectionComponent
} from './view/shared/sections/dashboard-head-section/dashboard-head-section.component';
import {
  DashboardQuaternarySectionComponent
} from './view/shared/sections/dashboard-quaternary-section/dashboard-quaternary-section.component';
import {DashboardBigCardComponent} from './view/shared/widgets/cards/dashboard-big-card/dashboard-big-card.component';
import {ListVendorColisComponent} from './view/modules/vendor/colis/list-vendor-colis/list-vendor-colis.component';
import {TableComponent} from './view/shared/layouts/table/table.component';
import {TableHeadComponent} from './view/shared/widgets/pieces/table-head/table-head.component';
import {TableFooterComponent} from './view/shared/widgets/pieces/table-footer/table-footer.component';
import {SidebarFooterComponent} from './view/shared/widgets/pieces/sidebar-footer/sidebar-footer.component';
import {RouteNotFoundComponent} from './view/pages/errors/route-not-found/route-not-found.component';
import {VendorStatisticsComponent} from './view/modules/vendor/vendor-statistics/vendor-statistics.component';
import {TableCellComponent} from "@app/view/shared/widgets/pieces/tabel-cell/table-cell.component";
import {AddVendorColisComponent} from './view/modules/vendor/colis/add-vendor-colis/add-vendor-colis.component';
import {
  TableHeadVendorColisComponent
} from './view/modules/vendor/colis/table-head-vendor-colis/table-head-vendor-colis.component';
import {
  AddColisVendorFormComponent
} from './view/shared/forms/vendor/add-colis-vendor-form/add-colis-vendor-form.component';
import {cityReducer} from "@app/core/state/city/city.reducer";
import {CityEffect} from "@app/core/state/city/city.effect";
import {colisReducer} from "@app/core/state/colis/colis.reducer";
import {ColisEffect} from "@app/core/state/colis/colis.effect";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomeNavbarComponent,
    HomeButtonComponent,
    HomeHeaderComponent,
    IconHelperComponent,
    HomeServiceSectionComponent,
    HomeServiceCardComponent,
    StatisticSectionComponent,
    StatisticPieceComponent,
    LoginPageComponent,
    LoginFormComponent,
    HomeSpinnerComponent,
    ErrorPageComponent,
    NotificationComponent,
    NavProfileComponent,
    UserProfileComponent,
    VendorDashboardComponent,
    DarkLightModeButtonComponent,
    InputPasswordComponent,
    NavDashboardComponent,
    SidebarComponent,
    DashboardPrimarySectionComponent,
    DashboardSecondarySectionComponent,
    DashboardCardComponent,
    DashboardHeadSectionComponent,
    DashboardQuaternarySectionComponent,
    DashboardBigCardComponent,
    ListVendorColisComponent,
    TableComponent,
    TableHeadComponent,
    TableFooterComponent,
    SidebarFooterComponent,
    RouteNotFoundComponent,
    VendorStatisticsComponent,
    TableCellComponent,
    AddVendorColisComponent,
    TableHeadVendorColisComponent,
    AddColisVendorFormComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
        profile: profileReducer,
        city: cityReducer,
        colis: colisReducer
      },
      {}
    ),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),

    EffectsModule.forRoot([ProfileEffect, CityEffect, ColisEffect]),

  ],
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandler},

    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true},

    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
