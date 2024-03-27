import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { NotificationTypeEnum } from "@app/utils/enums/notification-type.enum";

@Component({
  selector: 'app-notification-helper',
  templateUrl: './notification-helper.component.html',
  styleUrls: ['./notification-helper.component.css'],
})
export class NotificationHelperComponent implements OnInit {
  @Input() notificationType: NotificationTypeEnum | null = null;
  @Input() message: string | null = null;
  @Input() displayTime: number = 100;
  @Output() timerFinished = new EventEmitter<void>();

  protected readonly NotificationTypeEnum = NotificationTypeEnum;
  progress: number = 100;

  constructor() { }

  ngOnInit(): void {
    this.startTimer();
  }

private startTimer() {
  const duration = 5;
  const steps = Math.ceil(this.displayTime / duration);
  const increment = 100 / steps;
  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    this.progress -= increment;
    if (currentStep >= steps) {
      clearInterval(interval);
      this.timerFinished.emit();
    }
  }, duration);
}

  getBarClassByType(): string {
    switch (this.notificationType) {
      case NotificationTypeEnum.SUCCESS:
        return 'bg-green-600';
      case NotificationTypeEnum.ERROR:
        return 'bg-red-600';
      case NotificationTypeEnum.INFO:
        return 'bg-blue-600';
      case NotificationTypeEnum.WARNING:
        return 'bg-yellow-500';
      default:
        return 'bg-gray-600';
    }
  }



}
