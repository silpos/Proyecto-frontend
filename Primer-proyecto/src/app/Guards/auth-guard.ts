import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth-service';

// Decide si se puede entrar a una ruta: con sesion abierta si; sin sesion, envia al Login.
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const navigator = inject(Router);

  if (authService.IsLoggedIn()) {
    return true;
  }

  return navigator.createUrlTree(['/login']);
};
