import {Component, OnInit} from '@angular/core';
import {ErrorService} from "@app/core/service/error/error.service";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent implements OnInit {
  errorDetails: any;
  errorStatus: any;
  buttonName: string = 'Go back';

  constructor(private errorService: ErrorService) {
  }

  ngOnInit(): void {
    initFlowbite();
    this.errorDetails = this.errorService.errorDetails;
    this.errorStatus = this.errorService.errorStatus;
    if(this.errorStatus === 401){
      this.buttonName = 'Go to Home';
    }
  }

  goBack(): void {
    if(this.errorStatus === 401){
      window.location.href = '/';
      return;
    }
    window.history.back();
  }




}
