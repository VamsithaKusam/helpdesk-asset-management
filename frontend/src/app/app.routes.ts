import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard'; // 1. Import the guard

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  
  { 
    path: 'auth', 
    loadComponent: () => import('./features/auth/login/login').then(c => c.Login) 
  },
  { 
    path: 'admin', 
    // 2. Add the guard here!
    canActivate: [authGuard], 
      data: { role: 'Admin' },
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard').then(c => c.AdminDashboard) 
  },
  { 
    path: 'employee', 
    // 3. Add the guard here too!
    canActivate: [authGuard], 
    data: { role: 'Employee' },  
    loadComponent: () => import('./features/employee/employee-dashboard/employee-dashboard').then(c => c.EmployeeDashboard) 
  },

 
  {
  path: 'create-ticket',
  canActivate: [authGuard],
  data: { role: 'Employee' },  
  loadComponent: () => import('./features/tickets/components/create-ticket/create-ticket').then(c => c.CreateTicket)
},
{
  path: 'my-tickets',
  canActivate: [authGuard],
  data: { role: 'Employee' },
  loadComponent: () => import('./features/tickets/components/ticket-list/ticket-list').then(c => c.TicketList)
},
{
  path: 'admin-tickets',
  canActivate: [authGuard],
  data: { role: 'Admin' },
  loadComponent: () => import('./features/admin/admin-tickets/admin-tickets').then(c => c.AdminTickets)
},
{
  path: 'manage-users',
  canActivate: [authGuard],
  data: { role: 'Admin' },
  loadComponent: () => import('./features/admin/manage-users/manage-users').then(c => c.ManageUsers)
},
{
  path: 'manage-assets',
  canActivate: [authGuard],
  data: { role: 'Admin' },
  loadComponent: () => import('./features/admin/manage-assets/manage-assets').then(c => c.ManageAssets)
},
{ 
  path: 'my-assets', 
  canActivate: [authGuard], 
  data: { role: 'Employee' }, 
  loadComponent: () => import('./features/employee/my-assets/my-assets').then(c => c.MyAssets) 
},

 { path: '**', redirectTo: 'auth' }
];