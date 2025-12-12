# 📊 Fin-Track

Aplicación web educativa para la gestión financiera personal. Ahora el frontend está construido con **React + Vite**, reutilizando los contenidos que antes vivían en HTML estático.

---

## 🚀 Características
- Routing cliente con `react-router-dom` y una navegación consistente (inicio, contacto, planes, gastos, perfil, login y registro).
- Componentes reutilizables para el encabezado y el pie de página con estilos de **Bootstrap 5**.
- Formularios de autenticación conectados a la API (`/users/login` y `/users/register`) mediante `fetch` y variables de entorno.
- Formulario de contacto con feedback inmediato y un pequeño registro de gastos en memoria para practicar presupuestos.
- Sección de perfil que utiliza el token guardado en `localStorage` y controles rápidos para cerrar sesión.

---

## 🧱 Estructura del proyecto
```
FrontendFintTrack/
├── app/                 # Proyecto React (Vite)
│   ├── package.json
│   ├── src/
│   │   ├── components/  # Navbar y Footer
│   │   ├── pages/       # Vistas: Home, Contact, Login, etc.
│   │   └── services/    # Consumo de la API (login y register)
│   └── public/
├── assets/              # Recursos originales (legacy)
├── *.html               # Versiones estáticas anteriores (referencia)
└── README.md
```
Las páginas HTML antiguas se conservan únicamente como respaldo/referencia; toda la nueva funcionalidad se sirve desde `app/`.

---

## 🛠️ Cómo ejecutar el frontend React
1. Instala las dependencias (solo la primera vez):
   ```bash
   cd app
   npm install
   ```
2. Copia el archivo de variables de entorno y ajusta la URL de la API si es necesario:
   ```bash
   cp .env.example .env   # editar VITE_API_BASE_URL si corresponde
   ```
3. Inicia el entorno de desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación quedará disponible en `http://localhost:5173/` (por defecto).

### 🧪 Pruebas unitarias
La aplicación React utiliza **Vitest** y **Testing Library** para los tests de UI y hooks:
```bash
cd app
npm run test          # Ejecuta la suite una vez
npm run test:watch    # Modo interactivo
```
El archivo `src/context/AuthContext.test.jsx` es un buen ejemplo para crear nuevas pruebas sobre componentes o servicios del frontend.

---

## 🌐 Variables de entorno
| Variable             | Descripción                                   | Valor por defecto           |
|----------------------|-----------------------------------------------|-----------------------------|
| `VITE_API_BASE_URL`  | URL base de la API FastAPI/Django/etc.        | `http://localhost:8000`     |

---

## 📧 Contacto
📍 Proyecto académico — 2025  
✉️ info@fintrack.com

---
✨ *Desarrollado con React, Vite y Bootstrap.*
