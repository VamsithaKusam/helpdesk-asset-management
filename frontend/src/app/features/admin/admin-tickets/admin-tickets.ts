import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TicketService } from '../../tickets/services/ticket.service';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
  templateUrl: './admin-tickets.html',
  styleUrls: ['./admin-tickets.scss']
})
export class AdminTickets implements OnInit {
  searchControl = new FormControl('');
  isLoading = false;

  openTickets: any[] = [];
  inProgressTickets: any[] = [];
  resolvedTickets: any[] = [];

  constructor(private ticketService: TicketService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // startWith('') ensures the board loads immediately 
    this.searchControl.valueChanges.pipe(
      startWith(''), 
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.isLoading = true;
        return this.ticketService.getAllTickets(term ?? '');
      })
    ).subscribe({
      next: (data) => {
        this.filterTickets(data);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => this.isLoading = false
    });
  }

  filterTickets(data: any[]) {
    this.openTickets = data.filter(t => t.status?.toLowerCase() === 'open');
    this.inProgressTickets = data.filter(t => t.status?.toLowerCase().replace(' ', '') === 'inprogress');
    this.resolvedTickets = data.filter(t => t.status?.toLowerCase() === 'resolved');
  }

  // Helper used to manually reload the board if a sync fails
  refreshBoard() {
    const term = this.searchControl.value ?? '';
    this.ticketService.getAllTickets(term).subscribe(data => this.filterTickets(data));
  }

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const ticket = event.container.data[event.currentIndex];
      const payload = {
        TicketId: Number(ticket.id),
        Status: newStatus === 'InProgress' ? 'In Progress' : newStatus
      };

      this.ticketService.updateStatus(payload).subscribe({
        next: () => console.log("Status Synced"),
        error: (err) => {
          console.error("Sync Error:", err);
          alert('Update failed. Refreshing board...');
          this.refreshBoard(); // This now matches the method name above!
        }
      });
    }
  }
}