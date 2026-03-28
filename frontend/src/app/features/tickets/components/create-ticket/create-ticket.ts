import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-ticket.html',
  styleUrls: ['./create-ticket.scss']
})
export class CreateTicket {

  ticketForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl('Low', Validators.required)
  });

  constructor(private ticketService: TicketService) {}

  onSubmit() {
    if (this.ticketForm.valid) {
      this.ticketService.createTicket(this.ticketForm.value)
        .subscribe({
          next: () => {
            alert('Ticket created successfully');
            this.ticketForm.reset();
          },
          error: () => {
            alert('Error creating ticket');
          }
        });
    }
  }
}