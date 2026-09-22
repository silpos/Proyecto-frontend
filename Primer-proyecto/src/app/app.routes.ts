import { Routes } from '@angular/router';
import { Productos } from './Components/productos/productos';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: Productos, title: 'Productos' },
  { path: '**', redirectTo: 'productos' },
];
