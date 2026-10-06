import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductoServices } from '../../Services/producto-services';
import { ProductoDto } from '../../Models/producto';

@Component({
  selector: 'app-crear-producto',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './crear_producto.html',
})
export class CrearProducto {
  private productoServices = inject(ProductoServices);
  private fb = inject(FormBuilder);

  // Referencia al <input type="file"> del HTML, para poder limpiarlo despues de guardar
  private inputImagen = viewChild<ElementRef<HTMLInputElement>>('inputImagen');

  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly mensaje = signal<string | null>(null);

  // Imagen elegida, convertida a texto Base64. Tambien sirve para mostrar la vista previa.
  protected readonly imagenBase64 = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.maxLength(150)]],
    descripcion: ['', Validators.maxLength(500)],
    precio: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  // Se ejecuta cuando el usuario elige un archivo de imagen.
  // FileReader lee el archivo y lo convierte en un texto Base64 que se puede enviar en el JSON.
  seleccionarImagen(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) {
      this.imagenBase64.set(null);
      return;
    }

    const lector = new FileReader();
    lector.onload = () => this.imagenBase64.set(lector.result as string);
    lector.readAsDataURL(archivo);
  }

  // Envia el formulario a la API para crear el producto
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
      // La API sube esta imagen a Cloudinary y guarda la URL en el producto
      imagenBase64: this.imagenBase64(),
    };

    this.guardando.set(true);
    this.error.set(null);
    this.mensaje.set(null);
    this.productoServices.createProducto(dto).subscribe({
      next: () => {
        this.mensaje.set('Producto creado.');
        this.guardando.set(false);
        this.form.reset();
        this.limpiarImagen();
      },
      error: (e) => {
        this.error.set(this.textoError(e));
        this.guardando.set(false);
      },
    });
  }

  // Quita la vista previa y deja vacio el campo de archivo
  private limpiarImagen(): void {
    this.imagenBase64.set(null);
    const input = this.inputImagen();
    if (input) input.nativeElement.value = '';
  }

  protected invalido(campo: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[campo];
    return c.invalid && c.touched;
  }

  // La API devuelve { mensaje } en los 400/404; status 0 = la API no esta corriendo (o CORS la bloqueo)
  private textoError(e: HttpErrorResponse): string {
    if (e.status === 0) return 'No se pudo conectar con la API (¿está corriendo en http://localhost:5094?).';
    return e.error?.mensaje ?? `Error ${e.status}: ${e.statusText}`;
  }
}
