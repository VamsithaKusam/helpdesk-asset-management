import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../tickets/services/ticket.service';

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-tickets.html',
  styleUrls: ['./admin-tickets.scss']
})
export class AdminTickets implements OnInit {

  tickets: any[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getAllTickets().subscribe({
      next: (res: any) => {
        console.log("ALL TICKETS:", res);
        this.tickets = res.data || res;
      },
      error: (err) => console.error(err)
    });
  }

  changeStatus(ticketId: number, status: string) {
    const payload = {
      ticketId: ticketId,
      status: status
    };

    this.ticketService.updateStatus(payload).subscribe({
      next: () => {
        alert('Status updated');
        this.loadTickets();
      },
      error: (err) => console.error(err)
    });
  }
}