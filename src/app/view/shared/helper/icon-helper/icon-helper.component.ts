import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-icon-helper',
  templateUrl: './icon-helper.component.html',
  styleUrl: './icon-helper.component.css'
})
export class IconHelperComponent {

  @Input() iconName?: string;
  sanitizedSvg: SafeHtml | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.iconName) {
      this.loadSvg(this.iconName);
    }
  }

  private loadSvg(iconName: string) {
    const svgUrl = `assets/svg/${iconName}.svg`;
    fetch(svgUrl)
      .then(response => response.text())
      .then(svgText => {
        this.sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(svgText);
      })
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  }
}
