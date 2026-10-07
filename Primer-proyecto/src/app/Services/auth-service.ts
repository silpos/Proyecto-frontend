import { HttpClient } from '@angular/common/http';
import { inject, PLATFORM_ID, Service } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { Login } from '../Models/login';
import { User } from '../Models/usuario';

@Service()
export class AuthService {
  private httpClient = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private urlBase: string = environment.apiUrl;

  // La API responde el token como texto, por eso responseType: 'text'
  Login(model: Login) {
    return this.httpClient.post(`${this.urlBase}/Auth/Login`, model, { responseType: 'text' });
  }

  Register(model: User) {
    return this.httpClient.post(`${this.urlBase}/Auth/Register`, model, { responseType: 'text' });
  }

  // Hay sesion abierta si hay un token guardado.
  // localStorage solo existe en el navegador, por eso se revisa la plataforma.
  IsLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return !!localStorage.getItem('token');
  }

  GetToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('token');
  }

  // Nombre del usuario: va dentro del token (la parte del medio, en Base64).
  // La API lo guarda con la clave ClaimTypes.Name de .NET.
  GetNombre(): string {
    const token = this.GetToken();
    if (!token) return '';
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      // TextDecoder para que los nombres con tildes (José) se lean bien
      const texto = new TextDecoder().decode(Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)));
      const datos = JSON.parse(texto);
      return datos['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? '';
    } catch {
      return '';
    }
  }

  Logout() {
    localStorage.removeItem('token');
  }
}
