import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CrearProducto } from './pages/crear_producto/crear_producto';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';

// Navegacion del taller: Home → (click en usuario) → Login → (click en Regístrate) → Registro
export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio' }, // primera vista al abrir el proyecto
  { path: 'login', component: Login, title: 'Iniciar sesión' },
  { path: 'registro', component: Registro, title: 'Registro' },
  { path: 'crear_producto', component: CrearProducto, title: 'Crear producto' },
  { path: '**', redirectTo: '' },
];
