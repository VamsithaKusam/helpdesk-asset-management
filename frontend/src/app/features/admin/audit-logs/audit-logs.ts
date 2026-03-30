import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../tickets/services/ticket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-logs.html',
  styleUrls: ['./audit-logs.scss']
})
export class AuditLogs implements OnInit {

  logs$!: Observable<any[]>;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.logs$ = this.ticketService.getAuditLogs();
  }
}