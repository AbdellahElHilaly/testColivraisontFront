import { Injectable } from '@angular/core';
import {TokenService} from "@app/core/service/token/token.service";
import {CookieService} from "ngx-cookie-service";
import {ACCESS_TOKEN_ENV} from "@app/utils/env/token.env";

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService implements TokenService{
  constructor(private cookieService: CookieService) { }

  setToken(token: string): void {
    this.cookieService.set(
      ACCESS_TOKEN_ENV.KEY,
      token,
      ACCESS_TOKEN_ENV.EXPIRATION,
      ACCESS_TOKEN_ENV.PATH,
      ACCESS_TOKEN_ENV.DOMAIN,
      ACCESS_TOKEN_ENV.SECURE,
      ACCESS_TOKEN_ENV.SAME_SITE as 'Lax' | 'Strict' | 'None'
    );
  }

  getToken(): string {
    return this.cookieService.get(ACCESS_TOKEN_ENV.KEY);
  }

  removeToken(): void {
    this.cookieService.delete(ACCESS_TOKEN_ENV.KEY);
  }

  hasToken(): boolean {
    return this.cookieService.check(ACCESS_TOKEN_ENV.KEY);
  }
}
