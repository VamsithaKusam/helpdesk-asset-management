import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.scss']
})
export class TicketList implements OnInit {

  tickets: any[] = [];

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getMyTickets().subscribe({
  next: (res: any) => {
    console.log("FULL RESPONSE:", res);
    console.log("TYPE:", typeof res);
    console.log("IS ARRAY:", Array.isArray(res));

    this.tickets = res;
  },
  error: (err) => {
    console.error(err);
  }
});
  }
}