import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideHttpClient(), provideHttpClientTesting()],
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

  it('llena la tabla con los productos de la API', async () => {
    fixture.detectChanges();
    http.expectOne('http://localhost:5094/api/producto').flush([
      { id: 1, nombre: 'Mouse', descripcion: 'Inalámbrico', precio: 50000, stock: 3 },
      { id: 2, nombre: 'Teclado', descripcion: null, precio: 120000, stock: 0 },
    ]);
    await fixture.whenStable();

    const filas = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(filas.length).toBe(2);
    expect(filas[0].textContent).toContain('Mouse');
    expect(filas[1].textContent).toContain('Teclado');
  });
});
