import {InitialPrivilege, Privilege} from "@app/core/model/data/auth/privilege.model";

export interface Role {
  id: string;
  name: string;
  privileges: Array<Privilege>;
  createdAt: Date;
  updatedAt: Date;
}

export class InitRole implements Role {
  id = '';
  name = '';
  privileges = Array<Privilege>();
  createdAt = new Date();
  updatedAt = new Date();
}
