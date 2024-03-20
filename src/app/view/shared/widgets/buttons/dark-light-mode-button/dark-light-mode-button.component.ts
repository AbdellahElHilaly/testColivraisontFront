import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-dark-light-mode-button',
  templateUrl: './dark-light-mode-button.component.html',
  styleUrls: ['./dark-light-mode-button.component.css'] // Use styleUrls instead of styleUrl
})
export class DarkLightModeButtonComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.setInitialTheme();
    const themeToggle = this.el.nativeElement.querySelector('#theme-toggle');
    this.renderer.listen(themeToggle, 'click', this.toggleTheme.bind(this));
  }

  setInitialTheme() {
    const theme = localStorage.getItem('color-theme');
    if (theme === 'dark') {
      this.renderer.addClass(document.body, 'dark');
    }
  }

  toggleTheme() {
    let theme = localStorage.getItem('color-theme');
    const themeToggleDarkIcon = this.el.nativeElement.querySelector('#theme-toggle-dark-icon');
    const themeToggleLightIcon = this.el.nativeElement.querySelector('#theme-toggle-light-icon');

    if (theme === 'dark') {
      this.renderer.removeClass(document.body, 'dark');
      localStorage.setItem('color-theme', 'light');
      this.renderer.addClass(themeToggleDarkIcon, 'hidden');
      this.renderer.removeClass(themeToggleLightIcon, 'hidden');
    } else {
      this.renderer.addClass(document.body, 'dark');
      localStorage.setItem('color-theme', 'dark');
      this.renderer.removeClass(themeToggleDarkIcon, 'hidden');
      this.renderer.addClass(themeToggleLightIcon, 'hidden');
    }
  }
}
