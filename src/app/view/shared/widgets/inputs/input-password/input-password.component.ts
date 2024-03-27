import { Component } from '@angular/core';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css'
})
export class InputPasswordComponent {
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const inputEl = document.querySelector('.input-password input') as HTMLInputElement;
    if (inputEl) {
      inputEl.type = this.showPassword ? 'text' : 'password';
    }
  }
}
