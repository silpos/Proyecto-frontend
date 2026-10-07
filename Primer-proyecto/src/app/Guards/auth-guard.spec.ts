import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, RouterStateSnapshot, UrlTree } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { authGuard } from './auth-guard';

describe('authGuard', () => {
  const ejecutar = () =>
    TestBed.runInInjectionContext(() => authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([]), provideHttpClient()] });
  });

  it('deja pasar si hay sesion', () => {
    localStorage.setItem('token', 'abc');
    expect(ejecutar()).toBe(true);
  });

  it('envia al Login si no hay sesion', () => {
    const resultado = ejecutar() as UrlTree;
    expect(resultado.toString()).toBe('/login');
  });
});
