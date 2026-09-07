// import { RoleModel } from "../../roles/models/roles.model"; // O la ruta donde tengas Role

export interface UserModel {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * DTO para Creación de Usuario
 * Incluye el password y maneja solo IDs para los roles
 */
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}

/**
 * DTO para Actualización de Usuario
 * Hacemos que todos los campos sean opcionales (Partial)
 * y el password es opcional para no resetearlo por error
 */
export interface UpdateUserDto extends Partial<Omit<CreateUserDto, 'password'>> {
  password?: string; 
}