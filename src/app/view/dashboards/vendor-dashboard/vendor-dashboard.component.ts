import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgZone} from '@angular/core';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.css'
})
export class VendorDashboardComponent implements OnInit {


  constructor(private router: Router, private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.setInitialRoute();
  }


  private setInitialRoute() {
    this.ngZone.run(() => {
      this.router.navigate([
        '/vendor/dashboard',
        {outlets: {head_outlet: ['statistics'], colis_outlet: ['list', '0'], ramassage_outlet: ['demandes', '0']}}
      ]).then();
    });
  }
}
