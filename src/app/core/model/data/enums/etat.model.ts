export interface EtatModel{
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}


export class InitEtatModel implements EtatModel {
  id = '';
  name = '';
  createdAt = new Date();
  updatedAt = new Date();
}
