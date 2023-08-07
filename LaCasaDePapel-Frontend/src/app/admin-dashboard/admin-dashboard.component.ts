import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToggleService } from 'src/toggleService';
import { User2 } from 'src/User2';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  unreadMessagesCount: number = 0; // Initialize the unreadMessagesCount
  showMessage: boolean = false; // Initialize the showMessage flag
   // Initialize the emergencyMode flag
   users: User2[] =[];
  emergencyMode: boolean = false;
  searchText: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 7;
  messageSubscription: Subscription;


  constructor( private router: Router, private authService: AuthService, private toggleService: ToggleService,
    private sharedService: SharedService) { 
      this.messageSubscription = new Subscription();
    }

  ngOnInit() {
    this.getAllUsers();
    this.emergencyMode = this.toggleService.getIsAdminDashboardEnabled();
    this.messageSubscription = this.sharedService.message$.subscribe(message => {
      this.showMessage = true; // Show the message when received
    });
  }
  
  onToggleChange() {
    this.toggleService.setIsAdminDashboardEnabled(this.emergencyMode);

  }
  ngOnDestroy() {
    this.messageSubscription?.unsubscribe(); // Unsubscribe to avoid memory leaks
  }


  getAllUsers() {
    this.authService.getAllUsers().subscribe(
      (users: User2[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: number) { // Change the parameter name from 'id' to 'userId'
    this.authService.deleteUserById(userId).subscribe(
      () => {
        this.getAllUsers();
        window.alert('Account deleted successfully');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  showMessageOverlay(): void {
    this.showMessage = true;
  }

  closeMessageOverlay(): void {
    this.showMessage = false;
    this.sharedService.markAsRead();
  }

  showMessages(): void {
    this.unreadMessagesCount++;

  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
  }

  getCurrentUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  searchUsers(searchText: string) {
    this.currentPage = 1; 
    this.authService.searchUsers(searchText).subscribe(
      (data: User2[]) => {
        this.users = data;
        this.calculateTotalPages();
      },
      (error:any) => {
        console.error('Error searching users', error);
      }
    );

  }
  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.searchUsers(value);
  }
  readMessage() {
    // Perform read message logic here...
    this.unreadMessagesCount--;
    this.message = '';
  }
  deleteMessage(): void {
  }
}
