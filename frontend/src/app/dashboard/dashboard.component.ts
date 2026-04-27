import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormService, FormResponse } from '../form.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName = '';
  forms: FormResponse[] = [];
  loading = false;
  error = '';

  constructor(private router: Router, private formService: FormService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.userName = localStorage.getItem('user_name') ?? '';
    }
    this.loadForms();
  }

  loadForms() {
    this.loading = true;
    this.error = '';
    this.formService.getAll().subscribe({
      next: (response) => {
        this.forms = response.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los formularios.';
        this.loading = false;
      },
    });
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_name');
    }
    this.router.navigate(['/login']);
  }
}
