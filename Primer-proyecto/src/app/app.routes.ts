import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { authGuard } from './Guards/auth-guard';

// Rutas protegidas: tienen canActivate: [authGuard]. Sin sesion, el guard envia al Login.
// Rutas publicas: login y registro.
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    title: 'Inicio',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'crear_producto',
    title: 'Crear producto',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/crear_producto/crear_producto').then((m) => m.CrearProducto),
  },
  {
    path: 'imagenes',
    title: 'Imágenes de productos',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/imagenes/imagenes').then((m) => m.Imagenes),
  },
  { path: 'login', component: Login, title: 'Iniciar sesión' },
  { path: 'registro', component: Registro, title: 'Registro' },
  { path: '**', redirectTo: 'home' },
];
