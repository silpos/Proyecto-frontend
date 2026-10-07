import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoServices } from '../../Services/producto-services';
import { Producto, ProductoDto } from '../../Models/producto';

// Vista para asignar o cambiar la imagen de los productos que ya existen.
// Flujo: Producto → Imagen → API → Cloudinary → URL de imagen guardada en el producto.
@Component({
  selector: 'app-imagenes',
  imports: [RouterLink],
  templateUrl: './imagenes.html',
})
export class Imagenes implements OnInit {
  private productoServices = inject(ProductoServices);

  protected readonly productos = signal<Producto[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly mensaje = signal<string | null>(null);

  // Id del producto cuya imagen se esta subiendo (para mostrar "Subiendo…")
  protected readonly subiendoId = signal<number | null>(null);

  ngOnInit(): void {
    this.productoServices.getProductos().subscribe({
      next: (datos) => {
        this.productos.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los productos. ¿Está corriendo la API?');
        this.cargando.set(false);
      },
    });
  }

  // Se ejecuta cuando se elige un archivo para un producto.
  // 1) FileReader convierte la imagen a Base64.
  // 2) Se envia a la API con PUT; la API la sube a Cloudinary y devuelve el producto con su nueva imagenUrl.
  cambiarImagen(producto: Producto, evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const archivo = input.files?.[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = () => {
      // El PUT necesita todos los datos del producto; se envian los mismos que ya tiene
      // y solo cambia la imagen.
      const dto: ProductoDto = {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        imagenBase64: lector.result as string,
      };

      this.subiendoId.set(producto.id);
      this.error.set(null);
      this.mensaje.set(null);
      this.productoServices.updateProducto(producto.id, dto).subscribe({
        next: (actualizado) => {
          // Se reemplaza el producto en la lista para que se vea la nueva imagen
          this.productos.update((lista) => lista.map((p) => (p.id === actualizado.id ? actualizado : p)));
          this.mensaje.set(`Imagen de "${producto.nombre}" guardada en Cloudinary.`);
          this.subiendoId.set(null);
          input.value = '';
        },
        error: (e) => {
          this.error.set(e.status === 401 ? 'Tu sesión expiró. Cierra sesión y vuelve a ingresar.' : (e.error?.mensaje ?? 'No se pudo subir la imagen.'));
          this.subiendoId.set(null);
          input.value = '';
        },
      });
    };
    lector.readAsDataURL(archivo);
  }
}
