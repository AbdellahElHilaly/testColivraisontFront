import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _errorDetails: any;
  private _errorStatus: any;

  constructor() {
  }

  setErrorDetails(details: any, status: any): void {
    this._errorDetails = details;
    this._errorStatus = status;
  }

  get errorDetails(): any {
    return this._errorDetails;
  }

  get errorStatus(): any {
    return this._errorStatus;
  }

}
