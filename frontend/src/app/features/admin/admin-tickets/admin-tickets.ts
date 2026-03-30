import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TicketService } from '../../tickets/services/ticket.service';
import { debounceTime, distinctUntilChanged, switchMap, startWith, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-tickets.html',
  styleUrls: ['./admin-tickets.scss']
})
export class AdminTickets implements OnInit {
  searchControl = new FormControl('');
  tickets$!: Observable<any[]>; // Replacing 'any' with your actual Ticket DTO interface is recommended
  isLoading = false;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    // The RxJS Magic happens here
    this.tickets$ = this.searchControl.valueChanges.pipe(
      startWith(''), // Load all tickets initially before the user types anything
      debounceTime(400), // Wait 400ms after the last keystroke before continuing
      distinctUntilChanged(), // Only trigger if the search term actually changed
      switchMap(searchTerm => {
        this.isLoading = true;
        // switchMap automatically cancels any pending, older HTTP requests if a new one fires
        return this.ticketService.getAllTickets(searchTerm?? '').pipe(
          catchError(err => {
            console.error('Error fetching tickets', err);
            return of([]); // Return an empty array on error so the observable stream doesn't die
          })
        );
      })
    );

    // Turn off loading spinner when data arrives
    this.tickets$.subscribe(() => this.isLoading = false);
  }
}