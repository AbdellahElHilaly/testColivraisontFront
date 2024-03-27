import {CityModel} from "@app/core/model/data/enums/city.model";

export interface CityStore {
  cities: Array<CityModel>;
  hasData: boolean;
}

export const initialCityState: CityStore = {
  cities: new Array<CityModel>(),
  hasData: false,
}
