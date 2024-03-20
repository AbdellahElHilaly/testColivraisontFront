import {Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-add-vendor-colis',
  templateUrl: './add-vendor-colis.component.html',
  styleUrl: './add-vendor-colis.component.css'
})
export class AddVendorColisComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    initFlowbite();
  }

}
