import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {catchError, switchMap, filter, take} from 'rxjs/operators';
import {AuthApiService} from "@app/core/service/rest/auth-api.service";
import {AccessTokenService} from "@app/core/service/token/impl/access-token.service";
import {RefreshTokenService} from "@app/core/service/token/impl/refresh-token.service";
import {Router} from '@angular/router';
import {authEndpoints} from "@app/utils/env/api.env";

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress: boolean = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private authApiService: AuthApiService,
    private accessTokenService: AccessTokenService,
    private refreshTokenService: RefreshTokenService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshTokenService.hasToken()) {
      this.router.navigate(['/login']).then();
      return next.handle(req);
    } else {
      return next.handle(req).pipe(
        catchError(error => this.handleAuthError(error, req, next))
      );
    }
  }

  private handleAuthError(error: any, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.refreshTokenNeeded(error, req.url)) {
      if (!this.refreshTokenInProgress) {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);

        return this.handleRefreshToken(req, next);
      } else {
        return this.handleTokenSubject(req, next);
      }
    } else {
      return throwError(error);
    }
  }

  private handleRefreshToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authApiService.refreshToken().pipe(
      switchMap(response => {
        this.accessTokenService.setToken(response.accessToken);
        this.refreshTokenInProgress = false;
        this.refreshTokenSubject.next(response.accessToken);
        return next.handle(this.addTokenToRequest(req, response.accessToken));
      }),
      catchError(refreshError => {
        this.refreshTokenInProgress = false;
        this.refreshTokenService.removeToken();
        this.router.navigate(['/login']).then();
        return throwError(refreshError);
      })
    );
  }

  private handleTokenSubject(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.refreshTokenSubject.pipe(
      filter(token => !!token),
      take(1),
      switchMap(token => next.handle(this.addTokenToRequest(req, token as string)))
    );
  }

  private addTokenToRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private refreshTokenNeeded(error: any, url: string): boolean {
    return error instanceof HttpErrorResponse && (error.status === 403 )
      && !url.includes(authEndpoints.REFRESH_TOKEN);
  }
}
