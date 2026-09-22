import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Se renderiza en el navegador: los productos vienen de la API en tiempo real,
    // no tiene sentido pre-renderizarlos al compilar (la API no esta disponible en el build).
    path: '**',
    renderMode: RenderMode.Client
  }
];
