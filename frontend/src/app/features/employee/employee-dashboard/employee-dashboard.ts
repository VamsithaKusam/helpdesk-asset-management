import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TicketService } from '../../tickets/services/ticket.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.html',
  styleUrls: ['./employee-dashboard.scss']
})
export class EmployeeDashboard implements OnInit {
  employeeName = 'Employee';
  myActiveTickets = 0;

  constructor(private router: Router, private ticketService: TicketService, private cdr: ChangeDetectorRef) {
    
  }
ngOnInit() {
    // 1. Get real name from Token
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.employeeName = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']?.split('@')[0] || 'Employee';
      } catch (e) { console.error("Token parse error"); }
    }

    // 2. Bulletproof Ticket Count
    this.ticketService.getMyTickets().subscribe({
      next: (tickets: any[]) => {
        console.log("Dashboard loaded these tickets:", tickets); // <-- Check your console!
        
        if (tickets && tickets.length > 0) {
          this.myActiveTickets = tickets.filter(t => {
            // Convert to lowercase and trim spaces to guarantee a match
            const status = t.status?.trim().toLowerCase(); 
            return status === 'open' || status === 'in progress';
          }).length;
        } else {
          this.myActiveTickets = 0;
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error loading tickets for dashboard", err)
    });
  }
  goToCreateTicket() { this.router.navigate(['/create-ticket']); }
  goToTickets() { this.router.navigate(['/my-tickets']); }
  goToMyAssets() { this.router.navigate(['/my-assets']); } // We will create this next!
  goToDashboard() { 
  this.router.navigate(['/employee']); 
}
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth']);
  }
}