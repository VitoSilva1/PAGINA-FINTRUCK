import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/img/FinTrack-logo.png';

const navItems = [
  { label: 'Inicio', to: '/', isAnchor: false },
  { label: 'Sobre Nosotros', to: '/#Nosotros', isAnchor: true },
  { label: 'Consejos', to: '/#Consejos', isAnchor: true },
  { label: 'Contacto', to: '/contact', isAnchor: false },
  { label: 'Planes', to: '/subscription', isAnchor: false }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container d-flex justify-content-center">
          <Link className="navbar-brand d-flex align-items-center me-4" to="/" onClick={closeMenu}>
            <img src={logo} alt="Fin-Track Logo" height="70" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse justify-content-between ${isOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              {navItems.map((item) => (
                <li className="nav-item" key={item.label}>
                  {item.isAnchor ? (
                    <Link className="nav-link" to={item.to} onClick={closeMenu}>
                      {item.label}
                    </Link>
                  ) : (
                    <NavLink
                      end={item.to === '/'}
                      className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}
                      to={item.to}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div className="d-flex">
              <NavLink className="btn bg-white text-dark me-2" to="/login" onClick={closeMenu}>
                Iniciar sesión
              </NavLink>
              <NavLink className="btn btn-info text-white" to="/register" onClick={closeMenu}>
                Crear cuenta
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
