import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([{ path: '**', children: [] }])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should create', () => {
    fixture.detectChanges();
    http.expectOne('http://localhost:5094/api/producto').flush([]);
    expect(component).toBeTruthy();
  });

  it('muestra una card por cada producto de la API, con su imagen', async () => {
    fixture.detectChanges();
    http.expectOne('http://localhost:5094/api/producto').flush([
      { id: 1, nombre: 'Mouse', descripcion: 'Inalámbrico', precio: 50000, stock: 3, imagenUrl: 'https://res.cloudinary.com/demo/mouse.jpg' },
      { id: 2, nombre: 'Teclado', descripcion: null, precio: 120000, stock: 0, imagenUrl: null },
    ]);
    await fixture.whenStable();

    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('.card');
    expect(cards.length).toBe(2);
    expect(cards[0].textContent).toContain('Mouse');
    expect(cards[0].querySelector('img')?.getAttribute('src')).toBe('https://res.cloudinary.com/demo/mouse.jpg');
    expect(cards[1].textContent).toContain('Agotado');
  });

  it('Cerrar sesion borra el token', () => {
    localStorage.setItem('token', 'abc');
    fixture.detectChanges();
    http.expectOne('http://localhost:5094/api/producto').flush([]);
    const boton = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('button')).find((b) => b.textContent?.includes('Cerrar sesión'));
    boton!.click();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
