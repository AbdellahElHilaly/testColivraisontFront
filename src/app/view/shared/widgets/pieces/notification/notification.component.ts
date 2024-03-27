import {Component, OnDestroy, OnInit, ElementRef, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {NotificationService} from "@app/core/service/notification/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  message: string | null = null;
  notificationType: any;
  private subscription?: Subscription;
  @ViewChild('notificationButton') notificationButton?: ElementRef;
  displayTime: number = 5000;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.subscription = this.notificationService.getNotificationEnum()
      .subscribe(notificationEnum => {
        this.notificationType = notificationEnum;
      });

    this.subscription = this.notificationService.getNotification()
      .subscribe(message => {
        this.message = message;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  dismiss() {
    this.animateHide();
    setTimeout(() => {
      this.notificationService.clearNotification();
    }, 350);
  }

  animateHide() {
    this.addAnimationClass('hide-animation');
  }

  private addAnimationClass(animationClass: string) {
    this.notificationButton?.nativeElement.classList.remove('show-animation', 'hide-animation');
    this.notificationButton?.nativeElement.classList.add(animationClass);
  }


}
