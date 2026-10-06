// Refleja EcommerceApi.Models.Producto (lo que devuelve la API)
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  stock: number;
  // URL de la imagen guardada en Cloudinary (null si el producto no tiene imagen)
  imagenUrl: string | null;
}

// Refleja EcommerceApi.Models.Dtos.ProductoDto (lo que se envia en POST/PUT)
export interface ProductoDto {
  nombre: string;
  descripcion: string | null;
  precio: number;
  stock: number;
  // Imagen en Base64 ("data:image/png;base64,..."). La API la sube a Cloudinary
  // y guarda solo la URL. Es opcional.
  imagenBase64?: string | null;
}

// Respuesta del DELETE y de los errores 400/404: { mensaje: "..." }
export interface RespuestaMensaje {
  mensaje: string;
}
