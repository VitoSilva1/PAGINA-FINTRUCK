// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/img/FinTrack-logo.png';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Inicio', to: '/', isAnchor: false },
  { label: 'Sobre Nosotros', to: '/#Nosotros', isAnchor: true },
  { label: 'Consejos', to: '/#Consejos', isAnchor: true },
  { label: 'Contacto', to: '/contact', isAnchor: false },
  { label: 'Planes', to: '/subscription', isAnchor: false }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogged, logout } = useAuth();
  const closeMenu = () => setIsOpen(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container d-flex justify-content-center">

          <Link to="/" className="navbar-brand d-flex align-items-center me-4" onClick={closeMenu}>
            <img src={logo} alt="FinTrack Logo" height="70" />
          </Link>

          <button className="navbar-toggler" onClick={() => setIsOpen(!isOpen)}>
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse justify-content-between ${isOpen ? 'show' : ''}`}>

            <ul className="navbar-nav mx-auto">
              {navItems.map(({ label, to, isAnchor }) => (
                <li key={label} className="nav-item">
                  {isAnchor ? (
                    <Link className="nav-link" to={to} onClick={closeMenu}>{label}</Link>
                  ) : (
                    <NavLink
                      end={to === '/'}
                      className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}
                      to={to}
                      onClick={closeMenu}
                    >
                      {label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            {isLogged ? (
              <button className="btn btn-danger" onClick={logout}>Cerrar sesión</button>
            ) : (
              <div className="d-flex">
                <NavLink className="btn bg-white text-dark me-2" to="/login" onClick={closeMenu}>Iniciar sesión</NavLink>
                <NavLink className="btn btn-info text-white" to="/register" onClick={closeMenu}>Crear cuenta</NavLink>
              </div>
            )}

          </div>
        </div>
      </nav>
    </header>
  );
}
