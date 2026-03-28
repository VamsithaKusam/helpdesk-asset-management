import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 1. Simulates sending email/password to .NET and getting a token back
  login(credentials: any) {
    // We wrap it in 'of()' to simulate an HTTP response
    return of({ token: 'fake-jwt-token-for-' + credentials.email });
  }

  // 2. Simulates decoding the token to find the Role
  getRoleFromToken(token: string) {
    // If the fake token has 'manager' or 'admin' in it, they are an Admin
    if (token.includes('manager') || token.includes('admin')) {
      return 'Admin';
    }
    return 'Employee';
  }
}