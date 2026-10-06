import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CrearProducto } from './pages/crear_producto/crear_producto';

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio' },
  { path: 'crear_producto', component: CrearProducto, title: 'Crear producto' },
  { path: '**', redirectTo: '' },
];
