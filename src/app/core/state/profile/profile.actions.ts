import {createAction, props} from "@ngrx/store";
import {UserModel} from "@app/core/model/data/auth/user.model";
import {LoginModel} from "@app/core/model/data/auth/login.model";

export const loadProfile = createAction(
  '[Profile] Load Profile'
);
export const getProfileSuccess = createAction(
  '[Profile] Load Profile Success', props<{ profile: UserModel }>()
);


export const getProfileFailure = createAction(
  '[Profile] Load Profile Failure', props<{ error: any }>()
);







export const updateProfileAfterLogin = createAction(
  '[Profile] Update Profile After Login', props<{ loginModel: LoginModel }>()
);
