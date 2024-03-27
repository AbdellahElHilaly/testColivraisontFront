export interface CityModel {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class InitCityModel implements CityModel {
  id = '';
  name = '';
  createdAt = new Date();
  updatedAt = new Date();
}
