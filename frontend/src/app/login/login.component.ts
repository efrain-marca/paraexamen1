import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.message = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user_name', response.user.name);
          localStorage.setItem('user_id', response.user.id);
        }
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.message = 'Usuario o contraseña incorrectos';
      },
    });
  }
}
