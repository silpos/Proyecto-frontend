import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ProductoServices } from '../../Services/producto-services';
import { Producto } from '../../Models/producto';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private productoServices = inject(ProductoServices);

  protected readonly productos = signal<Producto[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal(false);

  ngOnInit(): void {
    this.callProductos();
  }

  // Pide los productos a la API y los guarda para mostrarlos en la tabla
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
}
