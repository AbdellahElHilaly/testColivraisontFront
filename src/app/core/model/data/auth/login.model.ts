import {TokenModel} from "@app/core/model/data/auth/token.model";
import {Role} from "@app/core/model/data/auth/role.model";

export interface LoginModel{
  name: string;
  jwtAuthenticationResponse: TokenModel;
  role: Role;
}
