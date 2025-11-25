// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { decodeAccessToken, loginUser } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailTrimmed = formValues.email.trim();
    const passwordTrimmed = formValues.password;

    if (!emailTrimmed || !passwordTrimmed) {
      setStatus({ type: 'danger', message: 'Por favor ingresa tu correo y contraseña.' });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus(null);

      const result = await loginUser(emailTrimmed, passwordTrimmed);

      // Guardar token
      localStorage.setItem('fintrackAccessToken', result.access_token);
      localStorage.setItem('fintrackUserEmail', emailTrimmed);

      // Guardar userId del token
      const decodedToken = decodeAccessToken(result.access_token);
      if (decodedToken?.sub) {
        localStorage.setItem('fintrackUserId', decodedToken.sub);
      }

      // Cambiar estado global
      login();

      // Redirigir
      navigate('/profile', { replace: true });

    } catch (error) {
      const errorMessage = error.message || 'Correo o contraseña incorrectos.';
      setStatus({ type: 'danger', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container py-5">
      <h1 className="text-center mb-4">Iniciar Sesión</h1>

      <form
        className="p-4 shadow rounded bg-light mx-auto"
        style={{ maxWidth: 420 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            autoComplete="email"
            className="form-control"
            name="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            className="form-control"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-info text-white" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </div>

        {status && (
          <div className={`alert alert-${status.type} mt-3`} role="alert">
            {status.message}
          </div>
        )}

        <p className="mt-3 text-center">
          ¿Aún no tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
