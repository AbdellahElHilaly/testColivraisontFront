import {Injectable} from "@angular/core";
import {RoleModel} from "@app/core/model/data/auth/role.model";
import {Router} from "@angular/router";
import {RolesEnum} from "@app/utils/enums/roles.enum";

@Injectable({
  providedIn: 'root'
})

export class RoutService {
  constructor(private router: Router) {
  }

  loginRedirectByRole(role: RoleModel | null): void {
    if (!role || !role.name) {
      this.router.navigate(['/login']).then(r => r);
    } else
    if (RolesEnum[role.name as keyof typeof RolesEnum] === RolesEnum.ADMIN) {
      this.router.navigate(['/home']).then(r => r);
    } else if (RolesEnum[role.name as keyof typeof RolesEnum] === RolesEnum.VENDOR) {
      this.router.navigate(['/vendor/dashboard']).then(r => r);
    } else if (RolesEnum[role.name as keyof typeof RolesEnum] === RolesEnum.STOCK_MANAGER) {
      this.router.navigate(['/home']).then(r => r);
    } else if (RolesEnum[role.name as keyof typeof RolesEnum] === RolesEnum.LIVREUR) {
      this.router.navigate(['/home']).then(r => r);
    }
  }

}
