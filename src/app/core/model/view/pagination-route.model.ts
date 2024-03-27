export interface PaginationRouteInfoModel {
  baseUrl: string;
  routeName: string;
  outletName: string;
  paramName: string;
  totalPages: number;

}

export class InitPaginationRouteInfoModel implements PaginationRouteInfoModel{
  baseUrl = '';
  outletName = '';
  routeName= '';
  paramName = '';
  totalPages = 0;
}
