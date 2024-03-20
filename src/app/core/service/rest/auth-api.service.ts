import {Injectable} from '@angular/core';
import {authEndpoints} from "@app/utils/env/api.env";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginModel} from "@app/core/model/data/auth/login.model";
import {TokenModel} from "@app/core/model/data/auth/token.model";
import {RefreshTokenService} from "@app/core/service/token/impl/refresh-token.service";

@Injectable({
  providedIn: 'root'
})

export class AuthApiService {
  constructor(private http: HttpClient, private refreshTokenService: RefreshTokenService
  ) {
  }

  login(data: any): Observable<LoginModel> {
    return this.http.post<LoginModel>(authEndpoints.LOGIN, data);
  }

  logout(): Observable<any> {
    throw new Error("Feature not implemented in the backend just try to remove the token from the client");
  }

  register(data: any): Observable<any> {
    throw new Error("You should le the admin to create users by roles");
  }


  refreshToken(): Observable<TokenModel> {
    return this.http.get<TokenModel>(authEndpoints.REFRESH_TOKEN);
  }
}
