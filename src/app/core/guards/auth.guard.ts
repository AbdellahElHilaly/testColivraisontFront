import {Injectable} from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {RefreshTokenService} from "@app/core/service/token/impl/refresh-token.service";
import {NotificationService} from "@app/core/service/notification/notification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private refreshTokenService: RefreshTokenService, private notificationService: NotificationService) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    if (this.refreshTokenService.hasToken()) {
      return new Observable<boolean | UrlTree>((observer) => {
        observer.next(true);
      });
    }

    return new Observable<boolean | UrlTree>((observer) => {
      this.notificationService.notifyError('Vous devez vous connecter');
      this.router.navigate(['/login']).then();
      observer.next(false);
    });
  }
}
