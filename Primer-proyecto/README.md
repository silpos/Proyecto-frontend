# PrimerProyecto

## Taller 3 - Inicio del e-commerce (Home, Login y Registro)

Frontend en Angular que consume la API del Taller 2 (`Ecommerce_API`).

### Vistas

| Ruta              | Vista          | Qué hace |
|-------------------|----------------|----------|
| `/`               | Home           | Primera vista. Barra con logo, menú, buscador y botón de usuario; banner; cards con los productos de la API |
| `/login`          | Login          | Solo visual: correo, contraseña, "Iniciar sesión" y enlace a Registro |
| `/registro`       | Registro       | Solo visual: nombre, correo, contraseña, confirmación y "Registrarse" |
| `/crear_producto` | Crear producto | Formulario del Taller 2, ahora con campo de imagen |
| `/imagenes`       | Imágenes       | Lista los productos y permite subir o cambiar la imagen de cada uno (PUT a la API → Cloudinary) |

Navegación: **Home** → (clic en 👤) → **Login** → (clic en "Regístrate") → **Registro**.

### Imágenes con Cloudinary

Producto → Imagen → Cloudinary → URL de imagen → API → Frontend

1. En **Crear producto** se elige una imagen; el frontend la convierte a Base64 (`FileReader`).
2. Se envía a la API en el campo `imagenBase64`.
3. La API la sube a Cloudinary y guarda en la base de datos solo la URL (`imagenUrl`).
   Para productos que ya existían se usa la vista **Imágenes**, que hace lo mismo con un `PUT`.
4. El Home recibe `imagenUrl` en cada producto y la muestra en la card.

### Checklist de entrega (punto 9 del taller)

1. Al iniciar el proyecto se muestra directamente el Home → ruta `''` en `app.routes.ts`.
2. El Home muestra los productos obtenidos desde la API del Taller 2 → `getProductos()` en `ProductoServices`.
3. Cada producto se presenta mediante una card → `@for` en `pages/home/home.html`.
4. Cada producto tiene su respectiva imagen → se asigna en **Crear producto** o en **Imágenes**.
5. Las imágenes utilizan Cloudinary → la card muestra `imagenUrl` (URL de Cloudinary que guarda la API).
6. Al seleccionar el usuario (👤) se navega hacia Login.
7. Desde Login se puede acceder a Registro ("¿No tienes una cuenta? Regístrate").
8. Login y Registro funcionan únicamente como vistas y navegación.

### Cómo ejecutarlo

1. Iniciar la API (`dotnet run --project EcommerceApi`), que queda en `http://localhost:5094`.
2. En esta carpeta: `npm install` y luego `ng serve`.
3. Abrir `http://localhost:4200/`: se muestra directamente el Home.

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
