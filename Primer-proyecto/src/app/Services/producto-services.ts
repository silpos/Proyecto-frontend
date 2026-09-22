import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto, ProductoDto, RespuestaMensaje } from '../Models/producto';

@Service()
export class ProductoServices {
  private httpClient = inject(HttpClient);
  private url = `${environment.apiUrl}/producto`;

  getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.url);
  }

  createProducto(producto: ProductoDto): Observable<Producto> {
    return this.httpClient.post<Producto>(this.url, producto);
  }

  updateProducto(id: number, producto: ProductoDto): Observable<Producto> {
    return this.httpClient.put<Producto>(`${this.url}/${id}`, producto);
  }

  deleteProducto(id: number): Observable<RespuestaMensaje> {
    return this.httpClient.delete<RespuestaMensaje>(`${this.url}/${id}`);
  }
}
