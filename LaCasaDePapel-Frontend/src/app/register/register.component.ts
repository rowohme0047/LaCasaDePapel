import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router from @angular/router
import { User } from '../../user';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User=new User("","","","","","","","");
  
  constructor(private authService: AuthService, private router: Router ) {

  } // Inject Router
 
  onSubmit() {
    if (this.user.pass !== this.user.cpass) {
      alert('Passwords do not match.');
      return;
    }
    console.log(this.user);
    this.authService.registerUser(this.user).subscribe(
      (data:any ) => {
        alert("User created with account");
      }
      
    )
  }

  goBack() {
    this.router.navigate(['/login']); // Replace 'login' with the actual path to your login page
  }
}
