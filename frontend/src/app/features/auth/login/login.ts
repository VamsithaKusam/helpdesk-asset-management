import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// FIXED IMPORT PATH: Pointing exactly to 'auth' instead of 'auth.service'
import { AuthService } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.loginForm.valid) {
      
      this.authService.login(this.loginForm.value).subscribe((response: any) => {
        
        const token = response.token;
        localStorage.setItem('authToken', token); 
        
        const userRole = this.authService.getRoleFromToken(token);

        if (userRole === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (userRole === 'Employee') {
          this.router.navigate(['/employee']);
        } else {
          alert('Error: Unauthorized Role');
        }
      });
    }
  }
}