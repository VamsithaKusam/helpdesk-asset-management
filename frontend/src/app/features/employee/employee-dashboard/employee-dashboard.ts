import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.scss']
})
export class EmployeeDashboard {
  employeeName = 'John Doe';
  myActiveTickets = 3;
  constructor(private router: Router) {}
logout() {
  console.log("Cleaning up session...");
  localStorage.removeItem('authToken');
  this.router.navigate(['/auth']);
}
}