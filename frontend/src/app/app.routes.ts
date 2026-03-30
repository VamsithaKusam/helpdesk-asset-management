import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';

// Import Admin Components
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { AdminTickets } from './features/admin/admin-tickets/admin-tickets';
import { ManageUsers } from './features/admin/manage-users/manage-users';
import { ManageAssets } from './features/admin/manage-assets/manage-assets';
import { ArchivedTickets } from './features/admin/archived-tickets/archived-tickets';
import { AuditLogs } from './features/admin/audit-logs/audit-logs';

export const routes: Routes = [
  // 1. Default Route
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },

  // 2. Auth Route
  { 
    path: 'auth', 
    loadComponent: () => import('./features/auth/login/login').then(c => c.Login) 
  },

  // 3. Admin Routes (Nested under the AdminLayout Sidebar Shell)
  { 
    path: 'admin', 
    component: AdminLayout,
    canActivate: [authGuard], 
    data: { role: 'Admin' },
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'tickets', component: AdminTickets },
      { path: 'manage-users', component: ManageUsers },
      { path: 'manage-assets', component: ManageAssets },
      { path: 'archived-tickets', component: ArchivedTickets },
      { path: 'audit-logs', component: AuditLogs },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // 4. Employee Routes
  { 
    path: 'employee', 
    canActivate: [authGuard], 
    data: { role: 'Employee' }, 
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./features/employee/employee-dashboard/employee-dashboard').then(c => c.EmployeeDashboard) 
      },
      { 
        path: 'create-ticket', 
        loadComponent: () => import('./features/tickets/components/create-ticket/create-ticket').then(c => c.CreateTicket) 
      },
      { 
        path: 'my-tickets', 
        loadComponent: () => import('./features/tickets/components/ticket-list/ticket-list').then(c => c.TicketList) 
      },
      { 
        path: 'my-assets', 
        loadComponent: () => import('./features/employee/my-assets/my-assets').then(c => c.MyAssets) 
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // 5. Wildcard (Catch-all)
  { path: '**', redirectTo: 'auth' }
];