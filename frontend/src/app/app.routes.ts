import { Routes } from '@angular/router';

export const routes: Routes = [
  // Default route: redirect to login
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  // Lazy Load Login
  { 
    path: 'auth', 
    loadComponent: () => import('./features/auth/login/login').then(c => c.Login) 
  },

  // Lazy Load Admin Dashboard
  { 
    path: 'admin', 
    loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard').then(c => c.AdminDashboard) 
  },

  // Lazy Load Employee Dashboard
  { 
    path: 'employee', 
    loadComponent: () => import('./features/employee/employee-dashboard/employee-dashboard').then(c => c.EmployeeDashboard) 
  },

  // Catch-all route
  { path: '**', redirectTo: 'auth' }
];