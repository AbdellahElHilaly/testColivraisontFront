export interface Privilege {
  id: string;
  name: string;
}

export class InitialPrivilege implements Privilege {
  id = '';
  name = '';
}
