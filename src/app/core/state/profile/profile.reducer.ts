import {createReducer, on} from "@ngrx/store";
import * as ProfileActions from "@app/core/state/profile/profile.actions";
import {initialProfileState, ProfileStore} from "@app/core/state/profile/profile.store";


export const profileReducer = createReducer(
  initialProfileState,

  on(ProfileActions.getProfileSuccess, (state, {profile}) => {
      return {
        ...state,
        profile: profile,
        isGetProfile: true,
        isGetMiniProfile: true,
        error: null,
      };
    }
  ),

  on(ProfileActions.getProfileFailure, (state, {error}) => {
      return {
        ...state,
        error: error,
      };
    }
  ),


  on(ProfileActions.updateProfileAfterLogin, (state, {loginModel}) => {
    return {
      ...state,
      profile: {
        ...state.profile,
        name: loginModel.name,
        role: loginModel.role
      },
      isGetMiniProfile: true,
    };
  })
);











