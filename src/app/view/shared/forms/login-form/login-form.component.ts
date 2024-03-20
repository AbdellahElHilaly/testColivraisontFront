import {Component} from '@angular/core';
import {LoginValidator} from "@app/core/validation/login.validator";
import {AuthApiService} from "@app/core/service/rest/auth-api.service";
import {AccessTokenService} from "@app/core/service/token/impl/access-token.service";
import {RefreshTokenService} from "@app/core/service/token/impl/refresh-token.service";
import {TokenModel} from "@app/core/model/data/auth/token.model";
import {NotificationService} from "@app/core/service/notification/notification.service";
import {RoutService} from "@app/core/service/rout/rout.service";
import {Store} from "@ngrx/store";
import {ProfileStore} from "@app/core/state/profile/profile.store";
import {updateProfileAfterLogin} from "@app/core/state/profile/profile.actions";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  isEnableValidation: boolean = true;
  isLoading: boolean = false;

  constructor(protected loginValidator: LoginValidator,
              private authApiService: AuthApiService,
              private accessTokenService: AccessTokenService,
              private refreshTokenService: RefreshTokenService,
              private routService: RoutService,
              private notificationService: NotificationService,
              protected store: Store<ProfileStore>
  ) {
  }


  getLabelValidationStyle(input: any) {
    if (this.isValid(input)) {
      return 'label-invalid';
    } else if (input.touched && input.valid && this.isEnableValidation) {
      return 'label-valid';
    }
    return '';
  }

  getInputValidationStyle(input: any) {
    if (this.isValid(input)) {
      return 'inputs-invalid';
    } else if (input.touched && input.valid && this.isEnableValidation) {
      return 'inputs-valid';
    }
    return '';
  }

  getSuggestionValidationStyle(input: any) {
    if (this.isValid(input)) {
      return 'suggestion';
    }
    return '';
  }

  private isValid(input: any) {
    return input.touched && input.invalid && this.isEnableValidation;
  }

  submitDisable() {
    return this.loginValidator.form.invalid && this.isEnableValidation;
  }

  onSubmit() {
    this.isEnableValidation = true;
    if (this.loginValidator.form.valid) {
      this.isLoading = true;
      this.login();
      this.notificationService.notifySuccess('Login successful');
    }
  }

  private login() {
    this.authApiService.login(this.loginValidator.form.value)
      .subscribe(
        (response) => {
          this.saveTokens(response.jwtAuthenticationResponse);
          this.isLoading = false;
          this.store.dispatch(updateProfileAfterLogin({loginModel: response}));
          this.routService.loginRedirectByRole(response.role);
        }
      );
  }

  private saveTokens(token: TokenModel) {
    this.accessTokenService.setToken(token.accessToken);
    this.refreshTokenService.setToken(token.refreshToken);
  }


}
