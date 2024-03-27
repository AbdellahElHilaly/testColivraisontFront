export interface ZoneModel {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}


export class InitZone implements ZoneModel {
  id = '';
  name = '';
  createdAt = new Date();
  updatedAt = new Date();
}
