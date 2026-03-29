import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../tickets/services/ticket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-tickets.html',
  styleUrls: ['./admin-tickets.scss']
})
export class AdminTickets implements OnInit {

  tickets$!: Observable<any[]>;   

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.tickets$ = this.ticketService.getAllTickets();  
  }

  changeStatus(ticketId: any, status: string) {
    if (!ticketId) {
      alert("Error: Ticket ID is missing.");
      return;
    }

    const payload = {
      TicketId: Number(ticketId),
      Status: status.trim()
    };

    this.ticketService.updateStatus(payload).subscribe({
      next: () => {
        alert('Status updated');
        this.tickets$ = this.ticketService.getAllTickets(); // reload
      },
      error: (err) => {
        console.error("ERROR RESPONSE:", err);
      }
    });
  }
}