import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToggleService } from 'src/toggleService';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private toggleService: ToggleService) {}
  onLogin() {
    if (this.toggleService.getIsAdminDashboardEnabled()) {
      this.router.navigate(['/maintanence']); // You can update the route as needed
    } else {
      this.router.navigate(['/login']);
    }
  }
}