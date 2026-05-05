import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService, FormResponse } from '../form.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formData = {
    title: '',
    description: '',
    name: '',
    email: '',
    phone: '',
    category: '',
    message: '',
  };

  isEditing = false;
  editingId: string | null = null;
  loading = false;
  error = '';
  success = '';

  constructor(private formService: FormService, private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const formToEdit = localStorage.getItem('form_to_edit');
      if (formToEdit) {
        const form = JSON.parse(formToEdit);
        this.formData = form;
        this.isEditing = true;
        this.editingId = form.id;
        localStorage.removeItem('form_to_edit');
      }
    }
  }

  onSubmit() {
    if (this.isEditing && this.editingId) {
      this.updateForm();
    } else {
      this.createForm();
    }
  }

  createForm() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.error = 'No hay usuario autenticado. Por favor, inicia sesión antes de crear un formulario.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const dataToSend = {
      ...this.formData,
      userId,
    };

    this.formService.create(dataToSend).subscribe({
      next: () => {
        this.success = 'Formulario creado exitosamente.';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al crear el formulario.';
        this.loading = false;
      },
    });
  }

  updateForm() {
    if (!this.editingId) return;

    this.loading = true;
    this.error = '';
    this.success = '';

    this.formService.update(this.editingId, this.formData).subscribe({
      next: () => {
        this.success = 'Formulario actualizado exitosamente.';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al actualizar el formulario.';
        this.loading = false;
      },
    });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
