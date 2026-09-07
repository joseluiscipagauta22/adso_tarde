import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, inject, Input, Optional, Output } from '@angular/core';
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
export class UserForm {

  @Input() set userData(value: UserModel | undefined) {}

  @Output() saveProfile = new EventEmitter<any>();
  userForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Optional() private dialogRef: MatDialogRef<UserForm>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', []],
      isActive: [true],
    });
  }

  ngOnInit(): void {}

  onSave() {
    if (this.userForm.invalid) return;
    const finalData = this.userForm.getRawValue();
    // console.log('entra', finalData);
    // this.saveProfile.emit(finalData);
    this.dialogRef.close(finalData);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
