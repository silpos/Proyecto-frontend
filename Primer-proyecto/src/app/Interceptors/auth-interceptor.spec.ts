import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth-interceptor';

describe('authInterceptor', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting()],
    });
  });

  it('agrega Authorization: Bearer <token> si hay sesion', () => {
    localStorage.setItem('token', 'abc');
    TestBed.inject(HttpClient).get('/api/producto').subscribe();
    const req = TestBed.inject(HttpTestingController).expectOne('/api/producto');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc');
  });

  it('no agrega nada si no hay sesion', () => {
    TestBed.inject(HttpClient).get('/api/producto').subscribe();
    const req = TestBed.inject(HttpTestingController).expectOne('/api/producto');
    expect(req.request.headers.has('Authorization')).toBe(false);
  });
});
