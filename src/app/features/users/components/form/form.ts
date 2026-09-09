import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class UserForm implements OnInit {
  
  userForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Optional() private dialogRef: MatDialogRef<UserForm>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) {
    // Inicializamos el formulario por defecto (Modo Creación)
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]], // Contraseña obligatoria al crear
      isActive: [true],
    });
  }

  ngOnInit(): void {
    // Si recibimos datos, significa que estamos en Modo Edición
    if (this.data) {
      this.isEditMode = true;

      // Al editar, la contraseña ya no es obligatoria
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();

      // Parcheamos los valores existentes en el formulario
      this.userForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        isActive: this.data.isActive ?? true
      });
    }
  }

  onSave() {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.getRawValue();

    // Si estamos editando y el campo password está vacío, lo eliminamos 
    // para no enviar un string vacío que sobreescriba la contraseña actual en el backend
    if (this.isEditMode && !formValue.password) {
      delete formValue.password;
    }

    // Devolvemos el objeto limpio al componente padre a través del diálogo
    this.dialogRef.close(formValue);
  }

  onCancel() {
    this.dialogRef.close();
  }
}