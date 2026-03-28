import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboard {
  adminName = 'IT Manager';
  totalAssets = 142;
  pendingTickets = 18;

  constructor(private router: Router) {} // Inject Router

 logout() {
  console.log("Cleaning up session...");
  localStorage.removeItem('authToken');
  this.router.navigate(['/auth']);
}
}