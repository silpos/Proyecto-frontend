import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Login } from './login';

describe('Login', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([{ path: '**', children: [] }])],
    }).compileComponents();
  });

  it('tiene el enlace para ir a Registro', () => {
    const fixture = TestBed.createComponent(Login);
    fixture.detectChanges();
    const enlace = (fixture.nativeElement as HTMLElement).querySelector('a[href="/registro"]');
    expect(enlace?.textContent).toContain('Regístrate');
  });

  it('guarda el token que devuelve la API', () => {
    const fixture = TestBed.createComponent(Login);
    const http = TestBed.inject(HttpTestingController);
    fixture.componentInstance.loginModel = { email: 'a@a.com', password: '123' };
    fixture.componentInstance.Login();

    const req = http.expectOne('http://localhost:5094/api/Auth/Login');
    expect(req.request.body).toEqual({ email: 'a@a.com', password: '123' });
    req.flush('token-de-prueba');
    expect(localStorage.getItem('token')).toBe('token-de-prueba');
  });

  it('muestra el mensaje de la API si las credenciales son incorrectas', async () => {
    const fixture = TestBed.createComponent(Login);
    const http = TestBed.inject(HttpTestingController);
    fixture.componentInstance.Login();
    http.expectOne('http://localhost:5094/api/Auth/Login').flush('Usuario o contraseña incorrectos.', { status: 401, statusText: 'Unauthorized' });
    fixture.detectChanges();
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Usuario o contraseña incorrectos.');
    expect(localStorage.getItem('token')).toBeNull();
  });
});
