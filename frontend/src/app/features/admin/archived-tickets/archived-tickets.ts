import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../tickets/services/ticket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-archived-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archived-tickets.html',
  styleUrls: ['./archived-tickets.scss']
})
export class ArchivedTickets implements OnInit {

  archivedTickets$!: Observable<any[]>;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.archivedTickets$ = this.ticketService.getArchivedTickets();
  }
}