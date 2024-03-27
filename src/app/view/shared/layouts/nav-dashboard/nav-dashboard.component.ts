import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserModel} from "@app/core/model/data/auth/user.model";
import {RefreshTokenService} from "@app/core/service/token/impl/refresh-token.service";
import {AccessTokenService} from "@app/core/service/token/impl/access-token.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {ProfileStore} from "@app/core/state/profile/profile.store";
import {profileSelector} from "@app/core/state/profile/profile.selector";
import {loadProfile} from "@app/core/state/profile/profile.actions";
import {NotificationService} from "@app/core/service/notification/notification.service";

@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrl: './nav-dashboard.component.css'
})
export class NavDashboardComponent implements OnInit {
  profile$: Observable<UserModel>;
  isLogin: boolean = true;

  constructor(private refreshTokenService: RefreshTokenService,
              private accessTokenService: AccessTokenService,
              private router: Router,
              private store: Store<ProfileStore>,
              private notificationService: NotificationService
  ) {
    this.profile$ = this.store.select(profileSelector);
  }

  ngOnInit(): void {
    if (this.isLogin) this.store.dispatch(loadProfile());
  }

  logout() {
    this.router.navigate(['/home']).then(r=>
      this.notificationService.notifyInfo('Logout successfully')
    );
    this.refreshTokenService.removeToken();
    console.log(this.refreshTokenService.getToken());
    this.accessTokenService.removeToken();

  }


}
