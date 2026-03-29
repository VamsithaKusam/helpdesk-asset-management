import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; font-family: Arial;">
      <h2>User Management</h2>
      <p>View all system users and their roles.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <tr style="background-color: #2c3e50; color: white; text-align: left;">
          <th style="padding: 12px;">Name</th>
          <th style="padding: 12px;">Email</th>
          <th style="padding: 12px;">Role</th>
        </tr>
        <tr *ngFor="let user of users$ | async" style="border-bottom: 1px solid #ddd;">
          <td style="padding: 12px;">{{ user.name }}</td>
          <td style="padding: 12px;">{{ user.email }}</td>
          <td style="padding: 12px; font-weight: bold; color: #3498db;">{{ user.role }}</td>
        </tr>
      </table>
    </div>
  `
})
export class ManageUsers implements OnInit {
  users$!: Observable<any[]>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers();
  }
}