import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, finalize, Observable} from "rxjs";
import {CityModel} from "@app/core/model/data/enums/city.model";
import {Store} from "@ngrx/store";
import {CityStore} from "@app/core/state/city/city.store";
import {citiesSelector} from "@app/core/state/city/city.selector";
import {initFlowbite} from "flowbite";
import {loadCities} from "@app/core/state/city/city.actions";
import {ColisVendorValidation} from "@app/core/validation/colis-vendor.validation";
import {NotificationService} from "@app/core/service/notification/notification.service";
import {CrudApiService} from "@app/core/service/rest/crud-api.service";
import {ColisModel} from "@app/core/model/data/colis.model";
import {vendorEndpoints} from "@app/utils/env/api.env";
import {createColis, createColisSuccess, loadColis} from "@app/core/state/colis/colis.actions";
import {Actions, ofType} from "@ngrx/effects";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-add-colis-vendor-form',
  templateUrl: './add-colis-vendor-form.component.html',
  styleUrl: './add-colis-vendor-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddColisVendorFormComponent implements OnInit {

  cities$: Observable<Array<CityModel>>;

  isEnableValidation: boolean = false;
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(protected cityStore: Store<CityStore>,
              protected colisStore: Store<ColisModel>,
              protected colisVendorValidator: ColisVendorValidation,
              private notificationService: NotificationService,
              private actions$: Actions
  ) {
    this.cities$ = this.cityStore.select(citiesSelector);
  }

  ngOnInit(): void {
    initFlowbite();
    this.cityStore.dispatch(loadCities());
  }

  markAsTouched(controlName: string) {
    this.colisVendorValidator.form.get(controlName)?.markAsTouched();
  }

  getInputValidationStyle(input: any) {
    if (this.isInValid(input)) return 'inputs-invalid';
    else if (this.isValid(input)) return 'inputs-valid';
    else return '';
  }

  getLabelValidationStyle(input: any) {

    if (this.isInValid(input)) return 'label-invalid';
    else if (this.isValid(input)) return 'label-valid';
    else return '';
  }

  getSuggestionValidationStyle(input: any) {
    if (this.isInValid(input)) return 'suggestion';
    else return '';
  }

  private isInValid(input: any) {
    return input.touched && input.invalid && this.isEnableValidation;
  }


  onSubmit() {

    this.isEnableValidation = true;
    this.colisVendorValidator.handelForm();

    if (this.colisVendorValidator.form.valid) {
      this.saveNewColis();
    }
  }

  private saveNewColis() {
    this.isLoading.next(true);

    this.colisStore.dispatch(createColis({colis: this.colisVendorValidator.form.value}));
    this.actions$.pipe(
      ofType(createColisSuccess),
      take(1)
    ).subscribe(() => {
      this.notificationService.notifySuccess('Colis ajouté avec succès !');
      this.isLoading.next(false);
      this.hideForm();
    });
  }

  private isValid(input: any) {
    return input.touched && input.valid && this.isEnableValidation;
  }

  private hideForm() {
    const buttonElement = document.getElementById('addVendorColiModal_hide');
    if (buttonElement) {
      buttonElement.click();
    }
  }
}
