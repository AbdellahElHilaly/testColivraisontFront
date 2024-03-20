import {Component, OnInit} from '@angular/core';
import {UserModel} from "@app/core/model/data/auth/user.model";
import {ProfileStore} from "@app/core/state/profile/profile.store";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {isGetProfileSelector, profileSelector} from "@app/core/state/profile/profile.selector";
import {loadProfile} from "@app/core/state/profile/profile.actions";


@Component({
  selector: 'app-users-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  profile$: Observable<UserModel | null>;

  constructor(protected store: Store<ProfileStore>) {
    this.profile$ = this.store.select(profileSelector);
  }


  ngOnInit(): void {
    this.store.dispatch(loadProfile());
  }

}
