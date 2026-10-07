import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth-service';
import { User } from '../../Models/usuario';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, FormsModule],
  templateUrl: './registro.html',
})
export class Registro {
  private authService = inject(AuthService);
  private navigator = inject(Router);

  // Modelo vacio que se llena con el formulario ([(ngModel)])
  public RegisterModel: User = { nombre: '', email: '', password: '' };

  // La confirmacion no se envia a la API: solo se compara aqui
  public confirmarPassword = '';

  protected readonly error = signal<string | null>(null);
  protected readonly cargando = signal(false);

  Register() {
    this.error.set(null);

    if (!this.RegisterModel.nombre || !this.RegisterModel.email || !this.RegisterModel.password) {
      this.error.set('Completa todos los campos.');
      return;
    }
    if (this.RegisterModel.password !== this.confirmarPassword) {
      this.error.set('Las contraseñas no coinciden.');
      return;
    }

    this.cargando.set(true);
    this.authService.Register(this.RegisterModel).subscribe({
      next: () => {
        // Registro correcto: se va al Login con un mensaje de exito
        this.navigator.navigate(['/login'], { queryParams: { registrado: 1 } });
      },
      error: (err) => {
        console.error('Error completo:', err);
        // La API responde 400 con el mensaje (ej. "El usuario ya existe.")
        this.error.set(err.status === 0 ? 'No se pudo conectar con la API.' : (err.error ?? 'No se pudo registrar el usuario.'));
        this.cargando.set(false);
      },
    });
  }
}
