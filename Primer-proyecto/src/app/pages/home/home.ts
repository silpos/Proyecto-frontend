import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductoServices } from '../../Services/producto-services';
import { AuthService } from '../../Services/auth-service';
import { Producto } from '../../Models/producto';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private productoServices = inject(ProductoServices);
  private authService = inject(AuthService);
  private navigator = inject(Router);

  // Nombre del usuario que inicio sesion (viene dentro del token)
  protected readonly nombreUsuario = this.authService.GetNombre();

  protected readonly productos = signal<Producto[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal(false);

  // Texto que el usuario escribe en el buscador
  protected readonly busqueda = signal('');

  // Lista que se muestra en pantalla: los productos cuyo nombre contiene el texto buscado.
  // computed() se recalcula solo cada vez que cambian "productos" o "busqueda".
  protected readonly productosFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    return this.productos().filter((p) => p.nombre.toLowerCase().includes(texto));
  });

  ngOnInit(): void {
    this.callProductos();
  }

  // Pide los productos a la API y los guarda para mostrarlos en las cards
  callProductos(): void {
    this.productoServices.getProductos().subscribe({
      next: (datos) => {
        this.productos.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(true);
        this.cargando.set(false);
      },
    });
  }

  // Logout: borra el token y vuelve al Login
  cerrarSesion(): void {
    this.authService.Logout();
    this.navigator.navigate(['/login']);
  }

  // Se ejecuta cada vez que el usuario escribe en el buscador
  buscar(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    this.busqueda.set(input.value);
  }
}
