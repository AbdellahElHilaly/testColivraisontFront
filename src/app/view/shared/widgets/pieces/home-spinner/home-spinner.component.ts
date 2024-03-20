import {AfterViewInit, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-home-spinner',
  templateUrl: './home-spinner.component.html',
  styleUrl: './home-spinner.component.css'
})
export class HomeSpinnerComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    const parentElement = this.elementRef.nativeElement.parentElement;
    parentElement.classList.add('relative');
  }


}
