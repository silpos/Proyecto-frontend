import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductoServices } from './producto-services';
import { Producto } from '../Models/producto';

describe('ProductoServices', () => {
  let service: ProductoServices;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductoServices);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('lista los productos con GET /api/producto', () => {
    const datos: Producto[] = [{ id: 1, nombre: 'Mouse', descripcion: null, precio: 50000, stock: 3 }];
    let recibido: Producto[] = [];
    service.getProductos().subscribe((p) => (recibido = p));

    const req = http.expectOne('http://localhost:5094/api/producto');
    expect(req.request.method).toBe('GET');
    req.flush(datos);
    expect(recibido).toEqual(datos);
  });

  it('actualiza con PUT /api/producto/{id}', () => {
    service.updateProducto(7, { nombre: 'Teclado', descripcion: null, precio: 1, stock: 1 }).subscribe();
    const req = http.expectOne('http://localhost:5094/api/producto/7');
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('elimina con DELETE /api/producto/{id}', () => {
    service.deleteProducto(7).subscribe();
    const req = http.expectOne('http://localhost:5094/api/producto/7');
    expect(req.request.method).toBe('DELETE');
    req.flush({ mensaje: 'ok' });
  });
});
