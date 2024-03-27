export interface CardStatisticsModel{
  iconName: string;
  title: string;
  value:number;
}

export class InitCardStatisticsModel implements CardStatisticsModel{
  iconName = '';
  title = '';
  value = 0;
}
