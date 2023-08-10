import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private unreadMessagesCountSubject = new BehaviorSubject<number>(0);
  unreadMessagesCount$ = this.unreadMessagesCountSubject.asObservable();
  private messageSubject = new BehaviorSubject<string>('');
  message$ = this.messageSubject.asObservable();

  sendMessage(message: string) {
    this.messageSubject.next(message);
    this.unreadMessagesCountSubject.next(1);
  }

  markMessagesAsRead() {
    this.unreadMessagesCountSubject.next(0);
  }

}
