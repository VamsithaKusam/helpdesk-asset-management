import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  isLoggedIn = false;
  userRole: string | null = '';

  constructor(private router: Router) {
    // Listen to route changes to update the header dynamically
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAuth();
      }
    });
  }

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth() {
    const token = localStorage.getItem('token');
    
    // Hide navbar if we are on the login page OR if there is no token
    if (!token || this.router.url.includes('/login')) {
      this.isLoggedIn = false;
      this.userRole = null;
    } else {
      this.isLoggedIn = true;
      this.userRole = this.extractRole(token);
    }
  }

  // Decodes the .NET JWT to find if they are Admin or Employee
  extractRole(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role || '';
    } catch (e) {
      return '';
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}