import {InitRole, RoleModel} from "@app/core/model/data/auth/role.model";
import {InitZone, ZoneModel} from "@app/core/model/data/auth/zone.model";
import {PhoneModel} from "@app/core/model/data/enums/phone.model";

export interface UserModel {
  id: string;

  name: string;
  email: string;
  password: string;

  role: RoleModel

  zone: ZoneModel;
  userPhones: Array<PhoneModel>


  createdAt: Date;
  updatedAt: Date;
}

export class InitUserModel implements UserModel {
  id = '';
  name = '';
  email = '';
  password = '';
  role = new InitRole();
  zone = new InitZone();
  userPhones = Array<PhoneModel>();
  createdAt = new Date();
  updatedAt = new Date();
}
