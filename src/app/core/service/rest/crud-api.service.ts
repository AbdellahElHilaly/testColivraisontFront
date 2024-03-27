import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {paginationEnv} from "@app/utils/env/pagination.env";
import {PageableModel} from "@app/core/model/pagination/pageable.model";

@Injectable({
  providedIn: 'root'
})
export class CrudApiService<T> {
  private endpoint: string | null = null;

  constructor(private http: HttpClient) {
  }

  create(data: any): Observable<T> {
    if (!this.endpoint) throw new Error("Endpoint not set");
    return this.http.post<T>(this.endpoint, data);
  }

  public endPoint(endpoint: string): CrudApiService<T> {
    this.endpoint = endpoint;
    return this;
  }

  public subEndPoint(subEndpoint: string): CrudApiService<T> {
    if (!this.endpoint) throw new Error("Endpoint not set");
    this.endpoint = this.endpoint + '/' + subEndpoint;
    return this;
  }

  public pathVariable(pathVariable: string): CrudApiService<T> {
    if (!this.endpoint) throw new Error("Endpoint not set");
    this.endpoint = this.endpoint + '/' + pathVariable;
    return this;
  }

  read(): Observable<T> {
    if (!this.endpoint) throw new Error("Endpoint not set");
    return this.http.get<T>(this.endpoint);
  }

  paginate(page: number): Observable<PageableModel<T>> {
    if (!this.endpoint) throw new Error("Endpoint not set");
    return this.http.get<PageableModel<T>>(this.endpoint + `?page=${page}&size=${paginationEnv.SIZE}`);
  }


  update(data: T | null): Observable<T> {
    if (!this.endpoint) throw new Error("Endpoint not set");
    return this.http.put<T>(this.endpoint, data);
  }

  delete(id: string): Observable<void> {
    if (!this.endpoint) throw new Error("Endpoint not set");
    return this.http.delete<void>(this.endpoint + id);
  }


}
