export interface StatusModel{
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}


export class InitStatusModel implements StatusModel {
  id = '';
  name = '';
  createdAt = new Date();
  updatedAt = new Date();
}
