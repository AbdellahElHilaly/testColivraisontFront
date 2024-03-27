import {Component, OnInit} from '@angular/core';
import {RoutService} from "@app/core/service/rout/rout.service";
import {Store} from "@ngrx/store";
import {ProfileStore} from "@app/core/state/profile/profile.store";
import {roleSelector} from "@app/core/state/profile/profile.selector";
import {Observable} from "rxjs";
import {RoleModel} from "@app/core/model/data/auth/role.model";
import {HomeSpinnerComponent} from "@app/view/shared/widgets/pieces/home-spinner/home-spinner.component";

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css'
})
export class HomeHeaderComponent implements OnInit {

  role$: Observable<RoleModel | null>;
  isLoading: boolean = false;

  constructor(private routService: RoutService,
              private store: Store<ProfileStore>) {
    this.role$ = this.store.select(roleSelector);
  }

  ngOnInit(): void {

  }


  getStarted() {
    this.isLoading = true;
    this.role$.subscribe(role => {
      this.routService.loginRedirectByRole(role);
      this.isLoading = false;
    });
  }
}
