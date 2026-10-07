import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth-service';
import { Login as LoginModel } from '../../Models/login';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private navigator = inject(Router);

  // Modelo vacio que se llena con el formulario ([(ngModel)])
  public loginModel: LoginModel = { email: '', password: '' };

  protected readonly error = signal<string | null>(null);
  protected readonly cargando = signal(false);

  // Si viene de registrarse (/login?registrado=1) se muestra un mensaje de exito
  protected readonly registrado = inject(ActivatedRoute).snapshot.queryParamMap.has('registrado');

  Login() {
    this.error.set(null);
    this.cargando.set(true);
    this.authService.Login(this.loginModel).subscribe({
      next: (response) => {
        // La respuesta es el token: se guarda para usarlo en las siguientes peticiones
        localStorage.setItem('token', response);
        this.navigator.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error:', err);
        // status 0 = la API no responde; si no, la API envia el mensaje (ej. "Usuario o contraseña incorrectos.")
        this.error.set(err.status === 0 ? 'No se pudo conectar con la API.' : (err.error ?? 'Credenciales incorrectas'));
        this.cargando.set(false);
      },
    });
  }
}
