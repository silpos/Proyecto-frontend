import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Vista de registro de usuario.
// En este taller es solo visual: todavia no guarda el usuario en la API.
@Component({
  selector: 'app-registro',
  imports: [RouterLink],
  templateUrl: './registro.html',
})
export class Registro {}
