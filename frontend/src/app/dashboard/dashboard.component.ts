import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService, FormResponse } from '../form.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userName = '';
  forms: FormResponse[] = [];
  loading = false;
  error = '';
  searchTerm = '';

  constructor(private router: Router, private formService: FormService) {}
  //el buscar
  get filteredForms() {
    if (!this.searchTerm) return this.forms;
    return this.forms.filter(form =>
      form.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      form.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      form.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      (form.description && form.description.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (form.category && form.category.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

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

  addForm() {
    this.router.navigate(['/form']);
  }

  editForm(form: FormResponse) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('form_to_edit', JSON.stringify(form));
    }
    this.router.navigate(['/form']);
  }

  deleteForm(formId: string | number) {
    if (confirm('¿Estás seguro de que deseas eliminar este formulario?')) {
      this.formService.delete(formId).subscribe({
        next: () => {
          this.loadForms();
        },
        error: () => {
          this.error = 'No se pudo eliminar el formulario.';
        },
      });
    }
  }
}
