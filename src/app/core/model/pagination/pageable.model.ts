export interface PageableModel<T> {
  content: Array<T>;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export class initPageableModel<T> implements PageableModel<T> {
  content = new Array<T>();
  totalElements = 0;
  totalPages = 0;
  size = 0;
  number = 0;
}
