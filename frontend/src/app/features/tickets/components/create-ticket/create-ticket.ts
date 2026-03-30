import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-ticket.html',
  styleUrls: ['./create-ticket.scss']
})
export class CreateTicket implements OnInit {
  ticketForm!: FormGroup;

  constructor(private fb: FormBuilder, private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      assetId: [''], // Dynamically required later
      description: ['', Validators.required],
      priority: ['Low', Validators.required],
      // Initialize FormArray with one empty step
      steps: this.fb.array([this.fb.control('', Validators.required)]) 
    });

    // Watch for category changes to dynamically update Asset ID validation
    this.ticketForm.get('category')?.valueChanges.subscribe(selectedCategory => {
      const assetControl = this.ticketForm.get('assetId');
      if (selectedCategory === 'Hardware Issue') {
        assetControl?.setValidators([Validators.required]);
      } else {
        assetControl?.clearValidators();
      }
      assetControl?.updateValueAndValidity(); // Recalculate validity
    });
  }

  // Getter for easy access to the FormArray in HTML
  get steps() {
    return this.ticketForm.get('steps') as FormArray;
  }

  addStep() {
    this.steps.push(this.fb.control('', Validators.required));
  }

  removeStep(index: number) {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
    }
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      // Flatten steps array into a single string for the backend DTO
      const formData = { ...this.ticketForm.value };
      formData.description = `${formData.description}\n\nSteps to Reproduce:\n` + 
                             formData.steps.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n');

      this.ticketService.createTicket(formData).subscribe({
        next: (res) => {
          alert('Ticket created successfully');
          this.ticketForm.reset({ priority: 'Low' }); // Reset with default priority
          this.steps.clear();
          this.addStep(); // Put one empty step back
        },
        error: (err) => {
          console.error("ERROR:", err);
          alert('Failed to create ticket');
        }
      });
    }
  }
}