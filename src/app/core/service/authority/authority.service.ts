import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {RoleModel} from "@app/core/model/data/auth/role.model";
import {AUTHORITY_ENV} from "@app/utils/env/token.env";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  constructor(private cookieService: CookieService) { }

  setAuthority(role: RoleModel): void {
    this.cookieService.set(
      AUTHORITY_ENV.KEY,
      JSON.stringify(this.roleToAuthorities(role)),
      AUTHORITY_ENV.EXPIRATION,
      AUTHORITY_ENV.PATH,
      AUTHORITY_ENV.DOMAIN,
      AUTHORITY_ENV.SECURE,
      AUTHORITY_ENV.SAME_SITE as 'Lax' | 'Strict' | 'None'
    );
  }

  getAuthority(): string[] {
    return JSON.parse(this.cookieService.get(AUTHORITY_ENV.KEY));
  }

  private roleToAuthorities(role: RoleModel) {
    let authorities = [];
    authorities.push(role.name);
    role.privileges.forEach(privilege => {
      authorities.push(privilege.name);
    });
    return authorities;
  }


}
