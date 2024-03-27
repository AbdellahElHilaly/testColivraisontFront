import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {NotificationTypeEnum} from "@app/utils/enums/notification-type.enum";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private notificationEnum: BehaviorSubject<NotificationTypeEnum |null> = new BehaviorSubject<NotificationTypeEnum | null>(null);
  constructor() { }

  notifySuccess(message: string): void {
    this.notificationSubject.next(message);
    this.notificationEnum.next(NotificationTypeEnum.SUCCESS);
  }

  notifyError(message: string): void {
    this.notificationSubject.next(message);
    this.notificationEnum.next(NotificationTypeEnum.ERROR);
  }
  notifyInfo(message: string): void {
    this.notificationSubject.next(message);
    this.notificationEnum.next(NotificationTypeEnum.INFO);
  }

  notifyWarning(message: string): void {
    this.notificationSubject.next(message);
    this.notificationEnum.next(NotificationTypeEnum.WARNING);
  }
  clearNotification(): void {
    this.notificationSubject.next(null);
    this.notificationEnum.next(null);
  }

  getNotification(): Observable<string | null> {
    return this.notificationSubject.asObservable();
  }
  getNotificationEnum(): Observable<NotificationTypeEnum | null> {
    return this.notificationEnum.asObservable();
  }
}
