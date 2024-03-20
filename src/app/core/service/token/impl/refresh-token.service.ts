import {Injectable} from '@angular/core';
import {TokenService} from "@app/core/service/token/token.service";
import {CookieService} from "ngx-cookie-service";
import {REFRESH_TOKEN_ENV} from "@app/utils/env/token.env";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService implements TokenService {

  constructor(private cookieService: CookieService) {
  }

  setToken(token: string): void {
    this.cookieService.set(
      REFRESH_TOKEN_ENV.KEY,
      token,
      REFRESH_TOKEN_ENV.EXPIRATION,
      REFRESH_TOKEN_ENV.PATH,
      REFRESH_TOKEN_ENV.DOMAIN,
      REFRESH_TOKEN_ENV.SECURE,
      REFRESH_TOKEN_ENV.SAME_SITE as 'Lax' | 'Strict' | 'None'
    );
  }

  getToken(): string {
    return this.cookieService.get(REFRESH_TOKEN_ENV.KEY);
  }

  removeToken(): void {
    this.cookieService.delete(REFRESH_TOKEN_ENV.KEY);
  }

  hasToken(): boolean {
    return this.cookieService.check(REFRESH_TOKEN_ENV.KEY);
  }
}
