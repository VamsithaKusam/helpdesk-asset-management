import { Component } from '@angular/core'; // ✅ Fixed: Import from @angular/core
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="logo">VC</div>
          <span>Value Creed</span>
        </div>
        <nav>
          <a routerLink="/admin/dashboard" routerLinkActive="active">📊 Dashboard</a>
          <a routerLink="/admin/tickets" routerLinkActive="active">🎫 Ticket Board</a>
          <a routerLink="/admin/manage-assets" routerLinkActive="active">💻 Asset Mgmt</a>
          <a routerLink="/admin/audit-logs" routerLinkActive="active">📜 Audit Logs</a>
        </nav>
        <div class="sidebar-footer">
          <button (click)="onLogout()" class="logout-btn">Logout</button>
        </div>
      </aside>
      <main class="content-area">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./admin-layout.scss'] // We will add styles below
})
export class AdminLayout {
  constructor(private router: Router) {}

  onLogout() {
    localStorage.clear(); // Clear session
    this.router.navigate(['/auth']); // Go to login
  }
}