import {Injectable} from "@angular/core";
import {Role} from "@app/core/model/data/auth/role.model";
import {Router} from "@angular/router";
import {RolesEnum} from "@app/utils/enums/roles.enum";

@Injectable({
  providedIn: 'root'
})

export class RoutService {
  constructor(private router: Router) {
  }

  loginRedirectByRole(role: Role): void {
    if (RolesEnum[role.name as keyof typeof RolesEnum] === RolesEnum.ADMIN) {
      this.router.navigate(['/profile']).then(r => r);
    } else if (RolesEnum[role.name as keyof typeof RolesEnum] === RolesEnum.VENDOR) {
      this.router.navigate(['/vendor/dashboard']).then(r => r);
    } else if (RolesEnum[role.name as keyof typeof RolesEnum] === RolesEnum.STOCK_MANAGER) {
      this.router.navigate(['/profile']).then(r => r);
    } else if (RolesEnum[role.name as keyof typeof RolesEnum] === RolesEnum.LIVREUR) {
      this.router.navigate(['/profile']).then(r => r);
    }
  }

}
