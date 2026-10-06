import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Vista de inicio de sesion.
// En este taller es solo visual: no valida usuarios contra la API (sin JWT, tokens ni sesiones).
@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
})
export class Login {}
