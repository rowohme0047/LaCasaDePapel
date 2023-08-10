import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Admin } from 'src/admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  admin: Admin = {
    username: '',
    pass: ''
  };

  constructor(private router: Router, private adminService: AdminService) {}

  onSubmit() {
    this.adminService.loginAdmin(this.admin).subscribe(
      (loggedInAdmin: Admin) => {
        // Assuming the server responds with the logged-in admin details, you can navigate to the admin dashboard.
        this.router.navigate(['/adminDashboard']);
      },
      (error) => {
        // Handle login error, e.g., display an error message to the user.
        console.error('Login failed:', error);
      }
    );
  }
}
