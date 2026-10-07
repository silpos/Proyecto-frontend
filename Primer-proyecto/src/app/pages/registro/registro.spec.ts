import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Registro } from './registro';

describe('Registro', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registro],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([{ path: '**', children: [] }])],
    }).compileComponents();
  });

  it('muestra los campos del formulario', () => {
    const fixture = TestBed.createComponent(Registro);
    fixture.detectChanges();
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('#nombre')).toBeTruthy();
    expect(html.querySelector('#correo')).toBeTruthy();
    expect(html.querySelector('#contrasena')).toBeTruthy();
    expect(html.querySelector('#confirmar')).toBeTruthy();
  });

  it('no llama a la API si las contraseñas no coinciden', () => {
    const fixture = TestBed.createComponent(Registro);
    const http = TestBed.inject(HttpTestingController);
    fixture.componentInstance.RegisterModel = { nombre: 'Luis', email: 'a@a.com', password: '123' };
    fixture.componentInstance.confirmarPassword = '456';
    fixture.componentInstance.Register();
    http.expectNone('http://localhost:5094/api/Auth/Register');
  });

  it('envia el usuario a POST /api/Auth/Register', () => {
    const fixture = TestBed.createComponent(Registro);
    const http = TestBed.inject(HttpTestingController);
    fixture.componentInstance.RegisterModel = { nombre: 'Luis', email: 'a@a.com', password: '123' };
    fixture.componentInstance.confirmarPassword = '123';
    fixture.componentInstance.Register();
    const req = http.expectOne('http://localhost:5094/api/Auth/Register');
    expect(req.request.body).toEqual({ nombre: 'Luis', email: 'a@a.com', password: '123' });
  });
});
