import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TicketService } from '../../tickets/services/ticket.service';
import { AssetService } from '../../../core/services/asset.service'; // Add this!

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboard implements OnInit {
  adminName = 'Admin';
  totalAssets = 0; 
  pendingTickets = 0;

  constructor(
    private router: Router, 
    private ticketService: TicketService,
    private assetService: AssetService,
    private cdr: ChangeDetectorRef 
  ) {}
ngOnInit() {
    // 1. JWT Decoder
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.adminName = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']?.split('@')[0] || 'Admin';
      } catch (e) { console.error("Token parse error"); }
    }

    // 2. Load Real Ticket Count
    this.ticketService.getAllTickets().subscribe(tickets => {
      this.pendingTickets = tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length;
      
    
      this.cdr.detectChanges(); 
    });

    // 3. Load Real Asset Count
    this.assetService.getAllAssets().subscribe(assets => {
      this.totalAssets = assets.length;
      
      
      this.cdr.detectChanges(); 
    });
  }
  goToAdminTickets() { this.router.navigate(['/admin-tickets']); }
  goToManageUsers() { this.router.navigate(['/manage-users']); }
  goToManageAssets() { this.router.navigate(['/manage-assets']); }
  goToDashboard() { 
  this.router.navigate(['/admin']); 
}
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth']);
  }
}