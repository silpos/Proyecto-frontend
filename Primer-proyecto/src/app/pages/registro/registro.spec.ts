import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Registro } from './registro';

describe('Registro', () => {
  it('muestra los campos del formulario', async () => {
    await TestBed.configureTestingModule({
      imports: [Registro],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(Registro);
    fixture.detectChanges();
    const html = fixture.nativeElement as HTMLElement;
    expect(html.querySelector('#nombre')).toBeTruthy();
    expect(html.querySelector('#correo')).toBeTruthy();
    expect(html.querySelector('#contrasena')).toBeTruthy();
    expect(html.querySelector('#confirmar')).toBeTruthy();
  });
});
