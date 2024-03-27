import {CityModel, InitCityModel} from "@app/core/model/data/enums/city.model";
import {InitStoreCityModel, StoreCityModel} from "@app/core/model/data/enums/store-city.model";

export interface RateModel {

  id: string;
  rate: number;

  city: CityModel;
  storeCity: StoreCityModel;

  createdAt: Date;
  updatedAt: Date;

}

export class InitRateModel implements RateModel {
  id = '';
  rate = 0;
  city = new InitCityModel();
  storeCity = new InitStoreCityModel();
  createdAt = new Date();
  updatedAt = new Date();
}
