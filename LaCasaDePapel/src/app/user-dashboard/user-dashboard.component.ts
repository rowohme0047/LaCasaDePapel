import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../../user';
import { AccountService } from '../account.service';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  @Output() messageSubmitted = new EventEmitter<string>();
  loggedInUser: User | null = null;
  firstName: any; // Initialize the firstName property
  lastName: any;
  user: User=new User("","","","","","","","");
  accountNum:any;
  accountNum2:any;
  transactionHistory:any;
  userId: any;
  ownCreditCard: any;
  selectedCreditCardType:string='';
  showCheckBookForm: boolean = false;
  supplyBookOf: string = '';
  collectAtBranch: boolean = false;
  dispatchByCourier: boolean = false;
  loanAmount: any;
  amount:any;
  transferAmt:any;
  depositA:any;
  loanTypes: string[] = [
    'Education Loan',
    'Home Loan',
    'Car Loan',
    'Small-Business Loan',
    'Personal Loan'
  ];
  cardHolderName:any;
  cardNumber: any;
  cvv: any;
  showBalanceForm: boolean = false;
  showDepositForm: boolean = false;
  showTransferForm: boolean = false;
  showHistoryForm: boolean = false;
creditCardFormSubmitted: boolean = false;
checkBookFormSubmitted: boolean = false;
loanFormSubmitted: boolean = false;
  selectedLoanType: any;
  showProfileOverlay: boolean = false;
  editMode = false;
  editfirst: string = "";
  showDeleteWarningForm: boolean = false;
  deleteReason: string = '';

   submitCreditCardForm() {
    if (this.creditCardFormSubmitted) {
      alert('You have already applied for a credit card.');
      return;
    }
    alert('Our executive will get in touch with you soon.');
    this.creditCardFormSubmitted = true;
  }

  submitCheckBookForm() {
    if (this.checkBookFormSubmitted) {
      alert('You have already applied for a check book.');
      return;
    }
    alert('Application submitted');
    this.checkBookFormSubmitted = true;
  }

  submitLoanForm() {
    if (this.loanFormSubmitted) {
      alert('You have already applied for a loan.');
      return;
    }
    alert('Our executive will get in touch with you soon.');
    this.loanFormSubmitted = true;
  }
  
  constructor(private authService: AuthService, private router: Router,
     private accountService: AccountService, private sharedService: SharedService) {}


  ngOnInit(): void {
    // Retrieve the logged-in user from AuthService
    this.loggedInUser = this.authService.getLoggedInUser();
    this.firstName=localStorage.getItem('uname');
    this.userId=localStorage.getItem('uId');
    this.accountService.getAccountByUserId(this.userId).subscribe( 
      (data:any)=>{
        this.accountNum=data.accountNum;
        console.log("accountNumber= "+this.accountNum);
      }    )
    if (this.loggedInUser) {
      this.firstName = this.loggedInUser.firstName;
      this.lastName = this.loggedInUser.lastName;
      console.log(this.firstName , this.lastName);
    }
      this.authService.getUserById(this.userId).subscribe(
        (user: User) => {
          this.user = user;
          console.log('User details:', this.user);
        },
        (error) => {
          console.error('Error fetching user details', error);
        }
      );

  }
  

  showForm1: boolean = false;
  showForm2: boolean = false;
  showForm3: boolean = false;

  // Methods to open and close the forms
  openForm1() {
    this.showForm1 = true;
    this.showForm2 = false;
    this.showForm3 = false;
  }

  openForm2() {
    this.showForm1 = false;
    this.showForm2 = true;
    this.showForm3 = false;
  }

  openForm3() {
    this.showForm1 = false;
    this.showForm2 = false;
    this.showForm3 = true;
  }

  // Function to close the form for all buttons
  closeForm() {
    this.showForm1 = false;
    this.showForm2 = false;
    this.showForm3 = false;
  }

  // Logout the user
  logout() {
    // Perform any necessary logout logic, such as clearing tokens or user information

    // Navigate to the login page after logout
    this.router.navigate(['/login']);
  }

getBalance(){
  console.log("getBalance");
  this.accountService.getBalanceByaccounNum(this.accountNum).subscribe(
    (data:any)=>{
     this.amount=data;
      this.showBalanceForm=true;
      
    }
  )
}
depositAmt() {
 this.showDepositForm = true;
}

transfer(): void {
  this.showTransferForm = true;
}

history(): void {
  this.accountService.getTransactionHistory(this.accountNum)
      .subscribe(
        (data: any[]) => {
          // Update the transaction history with the received data.
          this.transactionHistory = data;
        },
        (error: any) => {
          console.log('Error fetching transaction history:', error);
        }
      );
      this.showHistoryForm = true;
  }

submitTransferForm() {
  this.accountService.transaction(this.accountNum, this.accountNum2, this.transferAmt)
  .subscribe(
    (data: any) => {
      console.log('Response from server:', data);
      alert("Amount has been transferred successfully.");
      this.accountNum2 = '';
      this.transferAmt = '';
      this.closeForm2();
      // Other actions after successful transfer
    },
    (error: any) => {
      console.log('Error from server:', error);
      this.accountNum2 = '';
      this.transferAmt = '';
      alert("Failed to transfer amount. Please try again.");
    }
  );
}
submitDepositForm() {
    this.accountService.depositAmtToAccountNum(this.accountNum, this.depositA).subscribe(
      (data) => {
        alert("Amount is Deposited"+ data);
        
        this.depositA = '';
        this.cardHolderName = '';
        this.cardNumber = '';
        this.cvv = '';
        this.closeForm2();
      }
    )
  } 
closeForm2(): void {
  this.showBalanceForm = false;
  this.showDepositForm = false;
  this.showTransferForm = false;
  this.showHistoryForm = false;
  this.showProfileOverlay=false;
}
openProfileOverlay():void {
  this.showProfileOverlay = true;
}
showDeleteWarning() {
  this.showDeleteWarningForm = true;
}
closeDeleteWarning() {
  this.showDeleteWarningForm = false;
  this.deleteReason = ''; 
}
submitDeleteAccount() {
  const reason = this.deleteReason;
  this.messageSubmitted.emit(reason);
  this.closeDeleteWarning();
}
sendMessageToAdmin(message: string) {
  this.sharedService.sendMessage(message);
  window.alert('Message sent to admin!');
}
}
