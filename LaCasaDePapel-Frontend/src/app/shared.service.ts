import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();
  unreadMessagesCount = 0;

  

  sendMessage(message: string) {
    this.messageSource.next(message);
    this.unreadMessagesCount++; // Increment the unreadMessagesCount when a new message is sent
  }

  markAsRead() {
    this.unreadMessagesCount = 0; // Reset the unreadMessagesCount when messages are marked as read
  }
}
