import {Injectable} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ColisVendorValidation {

  public keys = {
    marchandise: 'marchandise',
    destinataire: 'destinataire',
    adresse: 'adresse',
    price: 'price',
    quantity: 'quantity',
    fragile: 'fragile',
    openable: 'openable',
    colisOfReplacement: 'colisOfReplacement',
    colisOfStock: 'colisOfStock',
    cityId: 'cityId',
    colisPhones_1: 'colisPhones_1',
    colisPhones_2: 'colisPhones_2',
    colisPhones_3: 'colisPhones_3',
    colisPhones: 'colisPhones',
  }


  public form: FormGroup = new FormGroup({

    marchandise: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    destinataire: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    adresse: new FormControl(null, [Validators.required, Validators.minLength(20)]),

    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(null, [Validators.required, Validators.min(1)]),

    fragile: new FormControl(null, [Validators.required, this.booleanValidator]),
    openable: new FormControl(null, [Validators.required, this.booleanValidator]),
    colisOfReplacement: new FormControl(false, [Validators.required, this.booleanValidator]),

    colisOfStock: new FormControl(null, [Validators.required, this.booleanValidator]),
    cityId: new FormControl(null, [Validators.required, this.uuidValidator]),
    colisPhones_1: new FormControl(null, [Validators.required, this.phoneValidator]),
    colisPhones_2: new FormControl(null, [this.phoneValidator]),
    colisPhones_3: new FormControl(null, [this.phoneValidator]),
    colisPhones: new FormControl(null,),

  });

  public handelForm() {
    this.resetDuplicatePhoneError();
    if (this.form.valid) {
      this.checkDuplicatePhone();
      this.addPhoneToList();
    }

  }

  private resetDuplicatePhoneError() {
    if (this.colisPhones_1?.hasError('duplicate') &&
      !this.colisPhones_1?.hasError('required') &&
      !this.colisPhones_1?.hasError('phone'))
      this.colisPhones_1?.setErrors(null);

    if (this.colisPhones_2?.hasError('duplicate') &&
      !this.colisPhones_2?.hasError('required') &&
      !this.colisPhones_2?.hasError('phone'))
      this.colisPhones_2?.setErrors(null);


    if (this.colisPhones_3?.hasError('duplicate') &&
      !this.colisPhones_3?.hasError('required') &&
      !this.colisPhones_3?.hasError('phone'))
      this.colisPhones_3?.setErrors(null);


  }

  private checkDuplicatePhone() {

    const phone1 = this.colisPhones_1?.value;
    const phone2 = this.colisPhones_2?.value;
    const phone3 = this.colisPhones_3?.value;

    if (phone1 && phone2 && phone1 === phone2) {
      this.colisPhones_1?.setErrors({'duplicate': true});
      this.colisPhones_2?.setErrors({'duplicate': true});
    }

    if (phone1 && phone3 && phone1 === phone3) {
      this.colisPhones_1?.setErrors({'duplicate': true});
      this.colisPhones_3?.setErrors({'duplicate': true});
    }

    if (phone2 && phone3 && phone2 === phone3) {
      this.colisPhones_2?.setErrors({'duplicate': true});
      this.colisPhones_3?.setErrors({'duplicate': true});
    }
  }

  private addPhoneToList() {
    this.colisPhones?.setValue([]);
    const phones = [];
    if (this.colisPhones_1?.valid) phones.push(this.colisPhones_1?.value);
    if (this.colisPhones_2?.valid && this.colisPhones_2?.value != '') phones.push(this.colisPhones_2?.value);
    if (this.colisPhones_3?.valid && this.colisPhones_3?.value != '') phones.push(this.colisPhones_3?.value);
    this.colisPhones?.setValue(phones);
  }

  private booleanValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === 'true' || value === 'false' || value === '0' || value === '1') {
      return null;
    }
    return {'boolean': true};
  }

  private uuidValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (uuidPattern.test(value)) {
      return null;
    }
    return {'uuid': true};
  }


  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === '') {
      return null;
    }
    const phonePattern = /^(06|05|07)\d{8}$/;
    if (phonePattern.test(value)) {
      return null;
    }
    return {'phone': true};
  }


  colisPhoneMessage(phoneIndex: number) {
    const phoneErrors = this.form.get('colisPhones_' + phoneIndex)?.errors;
    const errorMessages: string[] = [];

    if (phoneErrors) {
      if (phoneErrors['required']) {
        errorMessages.push('Le téléphone est requis.');
      } else if (phoneErrors['phone']) {
        errorMessages.push('Le téléphone n\'est pas valide. doit commencer par 05, 06 ou 07 et contenir 10 chiffres.');
      } else if (phoneErrors['duplicate']) {
        errorMessages.push('Le téléphone est dupliqué.');
      }
    }

    return errorMessages;
  }

  marchandiseMessage() {
    const marchandiseErrors = this.marchandise?.errors;
    const errorMessages: string[] = [];

    if (marchandiseErrors) {
      if (marchandiseErrors['required']) {
        errorMessages.push('La marchandise est requise.');
      } else if (marchandiseErrors['minlength']) {
        errorMessages.push('La marchandise doit contenir au moins 4 caractères.');
      }
    }

    return errorMessages;
  }


  destinataireMessage() {
    const destinataireErrors = this.destinataire?.errors;
    const errorMessages: string[] = [];
    if (destinataireErrors) {
      if (destinataireErrors['required']) {
        errorMessages.push('Le destinataire est requis.');
      } else if (destinataireErrors['minlength']) {
        errorMessages.push('Le destinataire doit contenir au moins 4 caractères.');
      }
    }
    return errorMessages;

  }

  adresseMessage() {
    const adresseErrors = this.adresse?.errors;
    const errorMessages: string[] = [];
    if (adresseErrors) {
      if (adresseErrors['required']) {
        errorMessages.push('L\'adresse est requise.');
      } else if (adresseErrors['minlength']) {
        errorMessages.push('L\'adresse doit contenir au moins 20 caractères.');
      }
    }
    return errorMessages;
  }

  priceMessage() {
    const priceErrors = this.price?.errors;
    const errorMessages: string[] = [];
    if (priceErrors) {
      if (priceErrors['required']) {
        errorMessages.push('Le prix est requis.');
      } else if (priceErrors['min']) {
        errorMessages.push('Le prix doit être supérieur à 0.');
      }
    }
    return errorMessages;
  }

  quantityMessage() {
    const quantityErrors = this.quantity?.errors;
    const errorMessages: string[] = [];
    if (quantityErrors) {
      if (quantityErrors['required']) {
        errorMessages.push('La quantité est requise.');
      } else if (quantityErrors['min']) {
        errorMessages.push('La quantité doit être supérieur à 0.');
      }
    }
    return errorMessages;

  }

  fragileMessage() {
    const fragileErrors = this.fragile?.errors;
    const errorMessages: string[] = [];
    if (fragileErrors) {
      if (fragileErrors['required']) {
        errorMessages.push('La fragilité est requise.');
      } else if (fragileErrors['boolean']) {
        errorMessages.push('La fragilité doit être vrai ou faux.');
      }
    }
    return errorMessages;
  }

  openableMessage() {
    const openableErrors = this.openable?.errors;
    const errorMessages: string[] = [];
    if (openableErrors) {
      if (openableErrors['required']) {
        errorMessages.push('L\'ouverture est requise.');
      } else if (openableErrors['boolean']) {
        errorMessages.push('L\'ouverture doit être vrai ou faux.');
      }
    }
    return errorMessages;
  }

  colisOfReplacementMessage() {
    const colisOfReplacementErrors = this.colisOfReplacement?.errors;
    const errorMessages: string[] = [];
    if (colisOfReplacementErrors) {
      if (colisOfReplacementErrors['required']) {
        errorMessages.push('Le colis de remplacement est requis.');
      } else if (colisOfReplacementErrors['boolean']) {
        errorMessages.push('Le colis de remplacement doit être vrai ou faux.');
      }
    }
    return errorMessages;
  }

  colisOfStockMessage() {
    const colisOfStockErrors = this.colisOfStock?.errors;
    const errorMessages: string[] = [];
    if (colisOfStockErrors) {
      if (colisOfStockErrors['required']) {
        errorMessages.push('Le colis de stock est requis.');
      } else if (colisOfStockErrors['boolean']) {
        errorMessages.push('Le colis de stock doit être vrai ou faux.');
      }
    }
    return errorMessages;
  }

  cityIdMessage() {
    const cityIdErrors = this.cityId?.errors;
    const errorMessages: string[] = [];
    if (cityIdErrors) {
      if (cityIdErrors['required']) {
        errorMessages.push('La ville est requise.');
      } else if (cityIdErrors['uuid']) {
        errorMessages.push('La ville n\'est pas valide.');
      }

    }
    return errorMessages;
  }


  get marchandise() {
    return this.form.get(this.keys.marchandise);
  }

  get destinataire() {
    return this.form.get(this.keys.destinataire);
  }

  get adresse() {
    return this.form.get(this.keys.adresse);
  }

  get price() {
    return this.form.get(this.keys.price);
  }

  get quantity() {
    return this.form.get(this.keys.quantity);
  }

  get fragile() {
    return this.form.get(this.keys.fragile);
  }

  get openable() {
    return this.form.get(this.keys.openable);
  }

  get colisOfReplacement() {
    return this.form.get(this.keys.colisOfReplacement);
  }

  get colisOfStock() {
    return this.form.get(this.keys.colisOfStock);
  }

  get cityId() {
    return this.form.get(this.keys.cityId);
  }

  get colisPhones() {
    return this.form.get(this.keys.colisPhones);
  }

  get colisPhones_1() {
    return this.form.get(this.keys.colisPhones_1);
  }

  get colisPhones_2() {
    return this.form.get(this.keys.colisPhones_2);
  }

  get colisPhones_3() {
    return this.form.get(this.keys.colisPhones_3);
  }


}
