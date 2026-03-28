import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('authToken');
  
  if (!token) {
    router.navigate(['/auth']);
    return false;
  }

  const role = authService.getRoleFromToken(token);

  const expectedRole = route.data?.['role'];
 
  if (expectedRole && role !== expectedRole) {
    console.warn("Access denied: role mismatch");
    router.navigate(['/auth']);
    return false;
  }
    console.log("TOKEN:", token);
    console.log("ROLE FROM TOKEN:", role);
    console.log("EXPECTED ROLE:", expectedRole);
  return true;
};