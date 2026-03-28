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
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard').then(c => c.AdminDashboard) 
  },
  { 
    path: 'employee', 
    // 3. Add the guard here too!
    canActivate: [authGuard], 
    loadComponent: () => import('./features/employee/employee-dashboard/employee-dashboard').then(c => c.EmployeeDashboard) 
  },

  { path: '**', redirectTo: 'auth' },
  {
  path: 'create-ticket',
  canActivate: [authGuard],
  loadComponent: () => import('./features/tickets/components/create-ticket/create-ticket').then(c => c.CreateTicket)
}
];