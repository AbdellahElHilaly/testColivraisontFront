import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NotificationService} from "@app/core/service/notification/notification.service";
import {NotificationTypeEnum} from "@app/utils/enums/notification-type.enum";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  message: string | null = null;
  notificationType: any;
  private subscription?: Subscription;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {

    this.subscription = this.notificationService.getNotificationEnum().subscribe(notificationEnum => {
      this.notificationType = notificationEnum;
    });

    this.subscription = this.notificationService.getNotification().subscribe(message => {
      this.message = message;
      this.closeTimeout();
    });


  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  clearNotification(): void {
    this.message = null;
  }

  getSubscriptionClass() {
    if (this.notificationType === NotificationTypeEnum.SUCCESS) {
      return 'bg-green-300';
    } else if (this.notificationType === NotificationTypeEnum.ERROR) {
      return 'bg-red-300';
    } else if (this.notificationType === NotificationTypeEnum.INFO) {
      return 'bg-blue-300';
    } else if (this.notificationType === NotificationTypeEnum.WARNING) {
      return 'bg-yellow-300';
    }
    return 'bg-white';
  }

  private closeTimeout() {
    setTimeout(() => {
      this.clearNotification();
    }, 5000);
  }
}

