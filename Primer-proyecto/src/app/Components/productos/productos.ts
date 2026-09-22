import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoServices } from '../../Services/producto-services';
import { Producto, ProductoDto } from '../../Models/producto';

@Component({
  selector: 'app-productos',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './productos.html',
})
export class Productos implements OnInit {
  private productoServices = inject(ProductoServices);
  private fb = inject(FormBuilder);

  protected readonly productos = signal<Producto[]>([]);
  protected readonly cargando = signal(false);
  protected readonly guardando = signal(false);
  protected readonly editandoId = signal<number | null>(null);
  protected readonly error = signal<string | null>(null);
  protected readonly mensaje = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(150)]],
    descripcion: ['', Validators.maxLength(500)],
    precio: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando.set(true);
    this.error.set(null);
    this.productoServices.getProductos().subscribe({
      next: (datos) => {
        this.productos.set(datos);
        this.cargando.set(false);
      },
      error: (e) => {
        this.error.set(this.textoError(e));
        this.cargando.set(false);
      },
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    const dto: ProductoDto = {
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion.trim() || null,
      precio: Number(valores.precio),
      stock: Number(valores.stock),
    };
    const id = this.editandoId();
    const peticion =
      id === null
        ? this.productoServices.createProducto(dto)
        : this.productoServices.updateProducto(id, dto);

    this.guardando.set(true);
    this.error.set(null);
    peticion.subscribe({
      next: () => {
        this.mensaje.set(id === null ? 'Producto creado.' : 'Producto actualizado.');
        this.guardando.set(false);
        this.cancelar();
        this.cargar();
      },
      error: (e) => {
        this.error.set(this.textoError(e));
        this.guardando.set(false);
      },
    });
  }

  editar(producto: Producto): void {
    this.editandoId.set(producto.id);
    this.mensaje.set(null);
    this.form.setValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion ?? '',
      precio: producto.precio,
      stock: producto.stock,
    });
  }

  cancelar(): void {
    this.editandoId.set(null);
    this.form.reset();
  }

  eliminar(producto: Producto): void {
    if (!confirm(`¿Eliminar "${producto.nombre}"?`)) return;
    this.error.set(null);
    this.productoServices.deleteProducto(producto.id).subscribe({
      next: (r) => {
        this.mensaje.set(r.mensaje || 'Producto eliminado.');
        if (this.editandoId() === producto.id) this.cancelar();
        this.cargar();
      },
      error: (e) => this.error.set(this.textoError(e)),
    });
  }

  protected invalido(campo: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[campo];
    return c.invalid && c.touched;
  }

  // La API devuelve { mensaje } en los 400/404. Status 0 (directo) o 502/504 (via proxy) = la API no esta corriendo
  private textoError(e: HttpErrorResponse): string {
    if ([0, 502, 504].includes(e.status)) return 'No se pudo conectar con la API (¿está corriendo en http://localhost:5094?).';
    return e.error?.mensaje ?? `Error ${e.status}: ${e.statusText}`;
  }
}
