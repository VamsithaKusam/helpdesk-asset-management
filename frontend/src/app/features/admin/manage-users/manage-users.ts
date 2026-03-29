import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 1000px; margin: auto;">
  <div style="border-bottom: 3px solid var(--vc-orange); margin-bottom: 20px; padding-bottom: 10px;">
    <h2 style="color: var(--vc-navy); margin: 0;">User Management</h2>
    <p style="color: #666; margin-top: 5px;">View all system users and their roles.</p>
  </div>
  
  <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.08); border-radius: 6px; overflow: hidden;">
    <tr style="background-color: var(--vc-navy); color: white; text-align: left;">
      <th style="padding: 16px;">Name</th>
      <th style="padding: 16px;">Email</th>
      <th style="padding: 16px;">Role</th>
    </tr>
    <tr *ngFor="let user of users$ | async" style="border-bottom: 1px solid #eee;">
      <td style="padding: 16px; color: #333;">{{ user.name }}</td>
      <td style="padding: 16px; color: #555;">{{ user.email }}</td>
      <td style="padding: 16px; font-weight: bold; color: var(--vc-orange);">{{ user.role }}</td>
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