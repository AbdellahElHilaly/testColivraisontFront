import {ColisModel, InitColisModel} from "@app/core/model/data/colis.model";
import {InitUserModel, UserModel} from "@app/core/model/data/auth/user.model";

export interface RemarqueModel {
  id: string;
  content: string;

  colis: ColisModel;
  user: UserModel;


  createdAt: Date;
  updatedAt: Date;
}

export class InitRemarqueModel implements RemarqueModel {
  id = '';
  content = '';
  colis = new InitColisModel();
  user = new InitUserModel();

  createdAt = new Date();
  updatedAt = new Date();
}
