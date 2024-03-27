export interface StoreCityModel{
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class InitStoreCityModel implements StoreCityModel {
  id = '';
  name = '';
  createdAt = new Date();
  updatedAt = new Date();
}
