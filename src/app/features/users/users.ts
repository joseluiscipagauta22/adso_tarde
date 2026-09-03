import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from './services/users-service';
import { UserForm } from './components/form/form';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {

  private usersService = inject(UsersService);
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

  // handleEdit(user: any) {
  //   const dialogRef = this.dialog.open(UserForm, {
  //     width: '600px',
  //     data: user
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
      
  //     console.log('log',user);
      
  //     if (result && user.id) {
  //       this.usersService.update(user.id, result).subscribe({
  //         next: (response) => {
  //           console.log('Usuario actualizado con éxito', response);
  //           // this.authService.updateCurrentUser(response);
  //         },
  //         error: (err) => console.error('Error al actualizar', err)
  //       });
  //     }
  //   });
  // }

  // handleDelete(user: any) {
  //   const confirmacion = confirm(`¿Estás seguro de eliminar a ${user.name} ${user.lastName}?`);
  //   if (confirmacion && user.id !== undefined) {
  //     this.usersService.delete(user.id).subscribe({
  //       next: () => console.log('Usuario eliminado'),
  //       error: (err) => console.error('Error al eliminar', err)
  //     });
  //   }
  // }

}
