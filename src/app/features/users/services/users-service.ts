import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { CreateUserDto, UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  private userSignal = signal<UserModel[]>([]);
  public users = this.userSignal.asReadonly();

  constructor() { this.loadUsers(); }

  loadUsers() {
    // this.http.get<UserModel[]>(this.apiUrl).subscribe(data => this.userSignal.set(data));
    this.http.get<UserModel[]>(this.apiUrl).subscribe(data => {
      console.log('Usuarios cargados:', data);
      this.userSignal.set(data);
    });
  }

  createUser(user: CreateUserDto) {
    return this.http.post<UserModel>(this.apiUrl, user).pipe(
      tap(newUser => this.userSignal.update(r => [...r, newUser]))
    );
  }

  // update(id: number, updatedUser: Partial<CreateUserDto>) {
  //   console.log('updatedUser', updatedUser);
  //   return this.http.put<UserModel>(`${this.apiUrl}/${id}`, updatedUser).pipe(
  //     tap((updatedData) => {
  //       console.log('entra');

  //       // Actualizamos la señal buscando el rol por ID y fusionando los cambios
  //       this.userSignal.update(users =>
  //         users.map(user => user.id === id ? { ...user, ...updatedData } : user)
  //       );
  //     })
  //   );
  // }

  // delete(id: number) {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
  //     tap(() => {
  //       // Filtramos el arreglo para quitar el rol eliminado
  //       this.userSignal.update(users =>
  //         users.filter(user => user.id !== id)
  //       );
  //     })
  //   );
  // }

  // updateProfile(updatedUser: any) {
  //   // Apunta a tu profileApiUrl (ej: /profile) sin necesidad de pasarle un ID en la URL
  //   return this.http.put<UserModel>(`${this.apiUrlProfile}`, updatedUser);
  // }

  // changePassword(changePasswordDto: any) {
  //   return this.http.patch<{ message: string }>(
  //     `${this.apiUrlProfile}/change-password`,
  //     changePasswordDto
  //   );
  // }

}
