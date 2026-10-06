import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Login } from './login';

describe('Login', () => {
  it('tiene el enlace para ir a Registro', async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Login);
    fixture.detectChanges();
    const enlace = (fixture.nativeElement as HTMLElement).querySelector('a[href="/registro"]');
    expect(enlace?.textContent).toContain('Regístrate');
  });
});
