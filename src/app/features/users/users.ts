import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from './services/users-service';
import { UserForm } from './components/form/form';
import { Table } from './components/table/table';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    Table,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {

  public usersService = inject(UsersService);
  private dialog = inject(MatDialog);


  openDialog() {
    const dialogRef = this.dialog.open(UserForm, { width: '600px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.createUser(result).subscribe({
          next: (response) => {
            console.log('Usuario creado con éxito', response);
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error al crear usuario', err);
          }
        });
      }
    });
  }

  handleEdit(user: any) {
    const dialogRef = this.dialog.open(UserForm, {
      width: '600px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && user.id) {
        this.usersService.update(user.id, result).subscribe({
          next: (response) => {
            console.log('Usuario actualizado con éxito', response);
            // this.authService.updateCurrentUser(response);
          },
          error: (err) => console.error('Error al actualizar', err)
        });
      }
    });
  }

  // handleDelete(user: any) {
  //   const confirmacion = confirm(`¿Estás seguro de eliminar a ${user.name} ${user.lastName}?`);
  //   if (confirmacion && user.id !== undefined) {
  //     this.usersService.delete(user.id).subscribe({
  //       next: () => console.log('Usuario eliminado'),
  //       error: (err) => console.error('Error al eliminar', err)
  //     });
  //   }
  // }

  handleDelete(userId: string) {
    // Buscamos el usuario de forma reactiva en la señal del servicio
    const user = this.usersService.users().find(u => u.id === userId);

    if (!user) return; // Validación de seguridad por si acaso

    const confirmacion = confirm(`¿Estás seguro de eliminar a ${user.name}?`);

    if (confirmacion) {
      this.usersService.delete(userId).subscribe({
        next: () => console.log('Usuario eliminado con éxito'),
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

}
