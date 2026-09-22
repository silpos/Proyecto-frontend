// Refleja EcommerceApi.Models.Producto (lo que devuelve la API)
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  stock: number;
}

// Refleja EcommerceApi.Models.Dtos.ProductoDto (lo que se envia en POST/PUT)
export interface ProductoDto {
  nombre: string;
  descripcion: string | null;
  precio: number;
  stock: number;
}

// Respuesta del DELETE y de los errores 400/404: { mensaje: "..." }
export interface RespuestaMensaje {
  mensaje: string;
}
