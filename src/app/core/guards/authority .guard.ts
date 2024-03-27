import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {NotificationService} from "@app/core/service/notification/notification.service";
import {Observable} from "rxjs";
import {AuthorityService} from "@app/core/service/authority/authority.service";

@Injectable({
  providedIn: 'root'
})

export class AuthorityGuard {
  authorities: string[] = [];

  constructor(private router: Router, private notificationService: NotificationService,
              private authorityService: AuthorityService
  ) {

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const requiredRoles: string[] = route.data['requiredRoles'];
    const requiredPermissions: string[] = route.data['requiredPermissions'];

    return new Observable<boolean>((observer) => {
      this.authorities = this.authorityService.getAuthority();
      if (this.hasAuthority(requiredRoles, requiredPermissions)) {
        observer.next(true);
      } else {
        this.notificationService.notifyError('Vous n\'avez pas les autorisations requises');
        this.router.navigate(['/login']).then();
        observer.next(false);
      }
    });


  }


  private hasAuthority(requiredRoles: string[], requiredPermissions: string[]) {
    if (requiredRoles.length > 0) {
      return this.hasRole(requiredRoles);
    } else {
      return this.hasPermission(requiredPermissions);
    }
  }

  private hasRole(requiredRoles: string[]) {
    return requiredRoles.some(role => this.authorities.includes(role));
  }

  private hasPermission(requiredPermissions: string[]) {
    return requiredPermissions.some(permission => this.authorities.includes(permission));
  }
}
