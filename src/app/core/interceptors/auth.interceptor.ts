import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccessTokenService} from "@app/core/service/token/impl/access-token.service";
import {authEndpoints} from "@app/utils/env/api.env";
import {RefreshTokenService} from "@app/core/service/token/impl/refresh-token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authReq?: HttpRequest<any>;

  constructor(private accessTokenService: AccessTokenService,
              private refreshTokenService: RefreshTokenService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.accessTokenService.getToken();


    if (this.isRefreshTokenNeeded(req.url)){
      this.authReq = this.getRefreshTokenRequest(req);
    }

    else if (this.isNotAccessTokenNeeded(req)) {
      return next.handle(req);
    } else this.authReq = this.getAccessTokenRequest(req);


    return next.handle(this.authReq);
  }

  private isNotAccessTokenNeeded(req: HttpRequest<any>): boolean {
    if (req.url.includes(authEndpoints.PROFILE)) return false;
    return Object.values(authEndpoints).includes(req.url);
  }


  private isRefreshTokenNeeded(url: string) {
    return url.includes(authEndpoints.REFRESH_TOKEN);
  }


  private getRefreshTokenRequest(req: HttpRequest<any>) {
    const refreshToken = this.refreshTokenService.getToken();
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
  }

  private getAccessTokenRequest(req: HttpRequest<any>) {
    const accessToken = this.accessTokenService.getToken();
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }


}
