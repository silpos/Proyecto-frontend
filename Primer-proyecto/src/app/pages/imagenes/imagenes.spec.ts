import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Imagenes } from './imagenes';

describe('Imagenes', () => {
  it('lista los productos con su imagen actual', async () => {
    await TestBed.configureTestingModule({
      imports: [Imagenes],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Imagenes);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('http://localhost:5094/api/producto').flush([
      { id: 1, nombre: 'Mouse', descripcion: null, precio: 50000, stock: 3, imagenUrl: 'https://res.cloudinary.com/demo/mouse.jpg' },
      { id: 2, nombre: 'Teclado', descripcion: null, precio: 120000, stock: 0, imagenUrl: null },
    ]);
    await fixture.whenStable();

    const filas = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(filas.length).toBe(2);
    expect(filas[0].querySelector('img')?.getAttribute('src')).toBe('https://res.cloudinary.com/demo/mouse.jpg');
    expect(filas[1].textContent).toContain('Sin imagen');
    http.verify();
  });
});
