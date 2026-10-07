import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(AuthService);
  });

  it('IsLoggedIn y Logout dependen del token guardado', () => {
    expect(service.IsLoggedIn()).toBe(false);
    localStorage.setItem('token', 'abc');
    expect(service.IsLoggedIn()).toBe(true);
    service.Logout();
    expect(service.IsLoggedIn()).toBe(false);
  });

  it('GetNombre lee el nombre (con tildes) desde el token', () => {
    const datos = { 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': 'José' };
    const bytes = new TextEncoder().encode(JSON.stringify(datos));
    const base64 = btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    localStorage.setItem('token', `x.${base64}.y`);
    expect(service.GetNombre()).toBe('José');
  });
});
