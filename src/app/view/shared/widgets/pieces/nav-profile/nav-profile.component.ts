import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RefreshTokenService} from "@app/core/service/token/impl/refresh-token.service";
import {Router} from "@angular/router";
import {AccessTokenService} from "@app/core/service/token/impl/access-token.service";
import {ProfileStore} from "@app/core/state/profile/profile.store";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {UserModel} from "@app/core/model/data/auth/user.model";
import {isGetMiniProfileSelector, profileSelector} from "@app/core/state/profile/profile.selector";
import {initFlowbite} from "flowbite";
import {loadProfile} from "@app/core/state/profile/profile.actions";
import {NotificationService} from "@app/core/service/notification/notification.service";

@Component({
  selector: 'app-nav-profile',
  templateUrl: './nav-profile.component.html',
  styleUrl: './nav-profile.component.css'
})
export class NavProfileComponent implements OnInit, AfterViewInit {

  isLogin: boolean = false;
  profile$: Observable<UserModel | null>;

  constructor(private refreshTokenService: RefreshTokenService,
              private accessTokenService: AccessTokenService,
              private router: Router,
              private store: Store<ProfileStore>,
              private notificationService: NotificationService
  ) {
    this.profile$ = this.store.select(profileSelector);
  }

  ngOnInit(): void {
    initFlowbite();
    this.isLogin = this.refreshTokenService.hasToken();
    if (this.isLogin) {
      this.store.select(isGetMiniProfileSelector).subscribe(GetMiniProfile => {
        if (!GetMiniProfile) {
          this.store.dispatch(loadProfile());
        }
      })
    }
  }


  ngAfterViewInit(): void {
    initFlowbite();
  }


  logout() {
    this.isLogin = false;
    this.refreshTokenService.removeToken();
    this.accessTokenService.removeToken();
    this.router.navigate(['/home']).then(r => this.notificationService.notifyInfo('Logout successfully'));
  }

}
