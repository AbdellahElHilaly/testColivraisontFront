import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorService } from "@app/core/service/error/error.service";
import {initFlowbite} from "flowbite";

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private router: Router, private errorService: ErrorService,

  ) { }

  handleError(error: Error | HttpErrorResponse) {
    initFlowbite();
    // console.error(error);
    if (error instanceof HttpErrorResponse && error.status === 403) {
      // let rhttp-server -p 3000 -c-1 --proxy http://localhost:3000?efresh token interceptor handle this
      return;
    }


    if (error instanceof HttpErrorResponse) {
      this.errorService.setErrorDetails(error.error, error.status);
    } else {
      this.errorService.setErrorDetails(error.message, 500);
    }

    if (this.router.url !== '/error') {
      this.router.navigate(['/error']).then();
    }
  }
}
