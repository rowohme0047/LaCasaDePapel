import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 username: string = '';
 pass:string = '';
 cpass:string='';
 user: User=new User("","","","","","","","");
 errorMessage: string = '';
 showForgotPassword: boolean = false;
 isFormSubmitted: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  

  
  onSubmit() {
    if (!this.user.username || !this.user.pass) {
      this.errorMessage='Please enter both username and password to login.';
      return;
    }
this.errorMessage='';
    this.authService.loginUser(this.user).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        console.log("uId",response.id);
       localStorage.setItem('uname',this.user.username);
       localStorage.setItem('uId',response.id);
        this.router.navigate(['/user-dashboard']);
      },
      (error: any) => {
        console.error('Login failed:', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
    console.log('Login form submitted:', this.user);

  }
  showForgotPasswordOverlay() {
    this.showForgotPassword = true;
  }
  hideForgotPasswordOverlay() {
    this.showForgotPassword = false;
    this.username='';
    this.pass='';
    this.cpass= '';
  }  
  hideForgotPassword(){
    this.showForgotPassword = false;
  }
  onForgotPasswordSubmit() {
    if (!this.user.username || !this.user.pass || !this.user.cpass) {
      this.errorMessage = 'Please fill in all the required fields.';
      return;
    }
  
    if (this.user.pass.length < 5) {
      this.errorMessage = 'New Password must be at least 5 characters long.';
      return;
    }
  
    if (this.user.pass !== this.user.cpass) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
  
    // Reset the error message when the form is valid
    this.errorMessage = '';
  
    // Proceed with the password update logic here
    this.authService.updateUserByUsername(this.user.username, this.user).subscribe(
      (response: User) => {
        console.log("Password successfully updated!", response);
        this.resetForm(); // Reset form fields
        this.showForgotPassword = false;
        window.alert('Password updated successfully!');
      },
      (error) => {
        console.error('Error updating password', error);
        this.errorMessage = 'Error updating password. Please try again.';
        this.resetForm();
        window.alert('Error updating password. Please try again.');
      }
    );
  }
  resetForm() {

    this.user.username = '';
    this.user.pass = '';
    this.user.cpass = '';
  }


  }

