import {Privilege} from "@app/core/model/data/auth/privilege.model";

export interface RoleModel {
  id: string;
  name: string;
  privileges: Array<Privilege>;
  createdAt: Date;
  updatedAt: Date;
}

export class InitRole implements RoleModel {
  id = '';
  name = '';
  privileges = Array<Privilege>();
  createdAt = new Date();
  updatedAt = new Date();
}
