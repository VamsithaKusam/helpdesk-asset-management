import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-list.html',
  styleUrls: ['./ticket-list.scss']
})
export class TicketList implements OnInit {

  tickets$!: Observable<any[]>; 

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.tickets$ = this.ticketService.getMyTickets();
  }
}