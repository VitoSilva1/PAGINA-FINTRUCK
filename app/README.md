# Frontend React (Vite)

Aplicación SPA de **Fintruck** construida con React 19 + Vite. Consume los microservicios de autenticación, usuarios, ingresos y gastos, y centraliza la navegación entre las vistas principales (inicio, contacto, login, registro, gastos, perfil, etc.).

## Scripts disponibles
```bash
npm run dev          # Servidor de desarrollo (http://localhost:5173)
npm run build        # Build para producción (carpeta dist/)
npm run preview      # Sirve el build resultante
npm run lint         # Ejecuta ESLint
npm run test         # Corre la suite de Vitest una vez
npm run test:watch   # Corre Vitest en modo interactivo/watch
```

## Estructura relevante (`src/`)
- `pages/`: vistas principales (`Home`, `Login`, `Register`, `Expenses`, etc.).
- `components/`: Navbar, Footer y piezas reutilizables.
- `context/AuthContext.jsx`: administra el estado global de autenticación (token en `localStorage`).
- `services/`: wrappers `fetch` para `auth`, `users`, `expenses`, etc.
- `routes/`: definición de rutas con `react-router-dom`.

## Variables de entorno

| Variable | Descripción | Default |
| --- | --- | --- |
| `VITE_AUTH_SERVICE_URL` | URL directa del microservicio de autenticación (`ms-auth-service`). | `http://localhost:8001` |
| `VITE_USER_SERVICE_URL` | URL del microservicio de usuarios (`ms-user-service`). | `http://localhost:8000` |
| `VITE_API_BASE_URL` | Base común cuando los servicios comparten host. Se usa como fallback para las dos anteriores. | `http://localhost:8000` |

> Crea un archivo `.env` (o `.env.local`) copiando desde `.env.example` y ajusta las URLs según tus despliegues.

## Pruebas
Se utilizan **Vitest** y **@testing-library/react**. El archivo `src/context/AuthContext.test.jsx` valida el comportamiento del contexto de autenticación (rehidratación de sesión, login, logout). Para agregar nuevos tests solo crea archivos `*.test.jsx/tsx` dentro de `src/` y ejecuta:
```bash
npm run test
```

## Navegación básica
El enrutador se define en `src/routes/AppRoutes.jsx` y está envuelto por `AuthProvider`. Las vistas protegidas pueden leer `isLogged` desde el contexto para redireccionar si el usuario no ha iniciado sesión.

## Estilos
El proyecto utiliza **Bootstrap 5** más estilos propios (`App.css`, `index.css`). También se incorporan iconos con `lucide-react`.
