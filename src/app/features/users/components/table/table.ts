import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  // Recibe la lista de usuarios desde el componente principal
  @Input() users: UserModel[] = [];
  // Emisores de eventos para las acciones del CRUD
  @Output() editUser = new EventEmitter<UserModel>();
  @Output() deleteUser = new EventEmitter<string>();

  // Columnas que se mostrarán en la tabla de Angular Material
  displayedColumns: string[] = ['name', 'email', 'isActive', 'actions'];

  onEdit(user: UserModel) {
    this.editUser.emit(user);
  }

  onDelete(id: string) {
    this.deleteUser.emit(id);
  }
}