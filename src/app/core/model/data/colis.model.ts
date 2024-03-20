import {InitUserModel, UserModel} from "@app/core/model/data/auth/user.model";
import {CityModel, InitCityModel} from "@app/core/model/data/enums/city.model";
import {EtatModel, InitEtatModel} from "@app/core/model/data/enums/etat.model";
import {InitStatusModel, StatusModel} from "@app/core/model/data/enums/status.model";
import {PhoneModel} from "@app/core/model/data/enums/phone.model";
import {InitRateModel, RateModel} from "@app/core/model/data/rate.model";

export interface ColisModel {

  id: string;
  suiviCode: string;
  adresse: string;
  destinataire: string;
  marchandise: string;
  quantity: number;
  price: number;
  livraisonRate: number;
  fragile: boolean;
  openable: boolean;
  colisOfStock: boolean;
  colisOfReplacement: boolean;


  ramassageDate: Date;
  putInStockDate: Date;
  shippingDate: Date;
  deliveryDate: Date;


  city: CityModel;
  etat: EtatModel;
  status: StatusModel;


  livreur: UserModel;
  vendor: UserModel;


  defaultRate: RateModel;
  colisPhones: Array<PhoneModel>;


  createdAt: Date;
  updatedAt: Date;

}


export class InitColisModel implements ColisModel {
  id = '';
  suiviCode = '';
  adresse = '';
  destinataire = '';
  marchandise = '';
  quantity = 0;
  price = 0;
  livraisonRate = 0;
  fragile = false;
  openable = false;
  colisOfStock = false;
  colisOfReplacement = false;

  ramassageDate = new Date();
  putInStockDate = new Date();
  shippingDate = new Date();
  deliveryDate = new Date();


  city = new InitCityModel();
  etat = new InitEtatModel();
  status = new InitStatusModel();

  livreur = new InitUserModel();
  vendor = new InitUserModel();

  defaultRate = new InitRateModel();
  colisPhones = Array<PhoneModel>();

  createdAt = new Date();
  updatedAt = new Date();
}
