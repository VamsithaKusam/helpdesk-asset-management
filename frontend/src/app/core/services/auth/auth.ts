import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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



getRoleFromToken(token: string) {
  try {
    const decoded: any = jwtDecode(token);

    console.log("Decoded Token:", decoded);

    const role =
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      || decoded.role
      || decoded.Role;

    console.log("EXTRACTED ROLE:", role);

    return role;
    
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
}
}