import { Component, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-piece',
  templateUrl: './statistic-piece.component.html',
  styleUrls: ['./statistic-piece.component.css']
})
export class StatisticPieceComponent implements OnInit {
  @Input() imgSrc?: string;
  @Input() number?: number;
  @Input() title?: string;

  fullImgSrc = '';

  randomNumberEffect = 0;
  observer: IntersectionObserver | undefined;
  animationExecuted = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createObserver();
    this.fullImgSrc = `assets/img/icons/${this.imgSrc}`;
  }

  private createObserver(): void {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animationExecuted) {
          this.countUp();
        }
      });
    });

    this.observer.observe(this.elementRef.nativeElement);
  }

  private countUp(): void {
    let displayRandomNumber = true;

    const interval = setInterval(() => {
      if (displayRandomNumber) {
        this.randomNumberEffect = Math.floor(Math.random() * 1000);
      } else {
        this.randomNumberEffect = this.number || 0;
        clearInterval(interval);
      }
    }, 20);

    setTimeout(() => {
      displayRandomNumber = false;
      this.animationExecuted = true;
    }, 1500);
  }
}
