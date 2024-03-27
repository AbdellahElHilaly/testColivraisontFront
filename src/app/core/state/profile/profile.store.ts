import {InitUserModel, UserModel} from "@app/core/model/data/auth/user.model";

export interface ProfileStore {
  profile: UserModel;
  isGetMiniProfile: boolean;
  isGetProfile: boolean;
}




export const initialProfileState: ProfileStore = {
  profile: new InitUserModel(),
  isGetMiniProfile: false,
  isGetProfile: false,
};


