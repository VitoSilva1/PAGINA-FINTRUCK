# Fin-Track

Aplicación web educativa para la gestión financiera personal. El frontend está construido con **React + Vite**, usa **Bootstrap 5** para el layout y consume servicios REST para autenticación, usuarios y gastos.

---

## Características principales
- Routing cliente con `react-router-dom` (inicio, contacto, planes, gastos, perfil, login y registro).
- Componentes reutilizables (`Navbar`, `Footer`, `IndicatorsBanner`) y páginas semánticas en React.
- Formularios de autenticación y registro conectados a la API (`/auth/login`, `/users/register`) con validación de email/contraseña y feedback accesible.
- Perfil que lee el token almacenado, valida expiración y consulta `/users/me` para mostrar datos del usuario.
- Registro de gastos con sumatoria en vivo y envío a `/expenses/bulk`.

---

## Estructura del proyecto
```
PAGINA-FINTRUCK/
└── app/                 # Proyecto React (Vite)
    ├── package.json
    ├── src/
    │   ├── components/  # Navbar, Footer, IndicatorsBanner
    │   ├── context/     # AuthContext (estado de sesión)
    │   ├── pages/       # Home, Contact, Login, Register, Expenses, Profile, etc.
    │   ├── routes/      # Rutas y ProtectedRoute
    │   ├── services/    # auth.js, expense.js (consumo API)
    │   ├── App.jsx / App.css / index.css
    │   └── setupTest.js # Config de pruebas
    └── public/
```
Las páginas HTML antiguas en la raíz se mantienen solo como referencia; toda la funcionalidad viva está dentro de `app/`.

---

## Cómo ejecutar el frontend
1. Instalar dependencias (primera vez):
   ```bash
   cd app
   npm install
   ```
2. Variables de entorno (puedes copiar el ejemplo):
   ```bash
   cp .env.example .env   # ajusta VITE_API_BASE_URL y/o VITE_AUTH_SERVICE_URL / VITE_USER_SERVICE_URL
   ```
3. Levantar el entorno de desarrollo:
   ```bash
   npm run dev
   ```
   La app queda en `http://localhost:5173/` por defecto.

---

## Variables de entorno
| Variable                  | Descripción                                | Valor por defecto         |
|---------------------------|--------------------------------------------|---------------------------|
| `VITE_API_BASE_URL`       | URL base común de la API                   | `http://localhost:8000`   |
| `VITE_AUTH_SERVICE_URL`   | URL base explícita para auth (opcional)    | `VITE_API_BASE_URL`       |
| `VITE_USER_SERVICE_URL`   | URL base explícita para usuarios (opcional)| `VITE_API_BASE_URL`       |

---

## Pruebas (énfasis)
- Framework: **Vitest** + **React Testing Library**.
- Config: `src/setupTest.js` provee `localStorage` en memoria y matchers de `@testing-library/jest-dom`.
- Suites actuales:
  - `src/context/AuthContext.test.jsx`: 
    - Paso a paso:
      1) Limpia `localStorage` antes de cada test.
      2) Monta el hook con `renderHook` y `AuthProvider`.
      3) Caso “sin token”: comprueba que `isLogged` es `false`.
      4) Caso “token presente”: coloca `fintrackAccessToken` en `localStorage`, monta, y espera a que `isLogged` sea `true`.
      5) Caso “token expirado”: genera un JWT con `exp` en el pasado, lo guarda y espera a que `isLogged` quede en `false`.
      6) Caso `login()`: llama `login()` con `act` y valida que `isLogged` sea `true`.
      7) Caso `logout()`: prepara `localStorage` con token/email/userId, llama `logout()` y valida `isLogged=false` y claves removidas.
  - `src/routes/ProtectedRoutes.test.jsx`:
    - Paso a paso:
      1) Mockea `useAuth` para devolver `{ isLogged: false }`.
      2) Renderiza un `MemoryRouter` con una ruta protegida y una ruta `/login`.
      3) Espera ver el texto de la pantalla de login (indica redirección).
      4) Repite mock devolviendo `{ isLogged: true }`.
      5) Renderiza de nuevo y verifica que se muestra el contenido protegido.
  - `src/services/auth.test.js`:
    - Paso a paso:
      1) Construye un JWT simplificado (header/payload base64url, firma dummy).
      2) Llama `decodeAccessToken` y verifica que devuelve el payload (`sub`, `exp`).
      3) Llama `decodeAccessToken` con cadenas malformadas o vacías y valida que retorne `null`.
- Ejecutar pruebas:
  ```bash
  cd app
  npm test
  ```

---

## Contacto
Proyecto académico — 2025  
info@fintrack.com

---
*Desarrollado con React, Vite y Bootstrap.*
