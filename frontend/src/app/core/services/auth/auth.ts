import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Your .NET Backend URL (Change the port to match Visual Studio later!)
  private apiUrl = 'https://localhost:7287/api/auth';

  // Inject the HTTP Client
  constructor(private http: HttpClient) {}

  // THE REAL LOGIN METHOD: Sends data to .NET
  login(credentials: any): Observable<any> {
    // This makes a real POST request to your backend!
    return this.http.post(`${this.apiUrl}/login`, credentials);
    
    // NOTE: If your .NET backend isn't running yet and you still want to test the UI, 
    // comment out the line above and uncomment the mock line below:
    // return of({ token: 'fake-jwt-token-for-' + credentials.email });
  }

  // We will update this later to decode the REAL JWT token from .NET
  getRoleFromToken(token: string) {
    if (token.includes('manager') || token.includes('admin')) {
      return 'Admin';
    }
    return 'Employee';
  }
}