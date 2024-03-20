import {Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";


@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrl: './nav-dashboard.component.css'
})
export class NavDashboardComponent implements OnInit{
    ngOnInit(): void {
      initFlowbite();
    }

}
