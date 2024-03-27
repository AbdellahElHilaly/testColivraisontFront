import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LoginValidator {

  public form: FormGroup = new FormGroup({
    'password': new FormControl(null, [Validators.required, Validators.minLength(8), this.passwordValidator()]),
    'email': new FormControl(null, [Validators.required, Validators.email])
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  private passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasNumber = /\d/.test(value);
      const hasLetter = /[a-zA-Z]/.test(value);
      const hasSpecialChar = /[@#$%^&*()_+!]/.test(value);
      const passwordValid = hasNumber && hasLetter && hasSpecialChar;
      return !passwordValid ? {'passwordInvalid': true} : null;
    };
  }

  passwordErrorMessage(): string[] {
    const passwordErrors = this.form.get('password')?.errors;
    const errorMessages: string[] = [];

    if (passwordErrors) {
      if (passwordErrors['required']) {
        errorMessages.push('Le mot de passe est requis.');
      }
      else if (passwordErrors['minlength']) {
        errorMessages.push('Le mot de passe doit contenir au moins 8 caractères.');
      }
      else if (passwordErrors['passwordInvalid']) {
        errorMessages.push('Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial.');
      }
    }

    return errorMessages;
  }

  emailErrorMessage() {
    const emailErrors = this.form.get('email')?.errors;
    const errorMessages: string[] = [];

    if (emailErrors) {
      if (emailErrors['required']) {
        errorMessages.push('L\'adresse email est requise.');
      }
      else if (emailErrors['email']) {
        errorMessages.push('L\'adresse email n\'est pas valide.');
      }
    }

    return errorMessages;
  }
}
