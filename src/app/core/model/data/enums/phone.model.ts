export interface PhoneModel {
  id: string;
  number: string;
  createdAt: Date;
  updatedAt: Date;
}

export class InitialPhone implements PhoneModel {
  id = '';
  number = '';
  createdAt = new Date();
  updatedAt = new Date();
}
