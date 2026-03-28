import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check if the user has a token in their browser storage
  const token = localStorage.getItem('authToken');

  if (token) {
    // They have a token! Open the door.
    return true;
  } else {
    // No token? Kick them back to the login screen.
    router.navigate(['/auth']);
    return false;
  }
};