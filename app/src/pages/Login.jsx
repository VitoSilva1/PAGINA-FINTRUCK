// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { decodeAccessToken, loginUser } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

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

  const validate = () => {
    const emailTrimmed = formValues.email.trim();
    const passwordTrimmed = formValues.password;

    if (!emailTrimmed || !passwordTrimmed) {
      return 'Por favor ingresa tu correo y contraseña.';
    }
    if (!emailPattern.test(emailTrimmed)) {
      return 'Ingresa un correo electrónico válido.';
    }
    if (passwordTrimmed.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errorMsg = validate();
    if (errorMsg) {
      setStatus({ type: 'danger', message: errorMsg });
      return;
    }

    const emailTrimmed = formValues.email.trim();
    const passwordTrimmed = formValues.password;

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
      const errorMessage = typeof error?.message === 'string'
        ? error.message
        : 'Correo o contraseña incorrectos.';
      setStatus({ type: 'danger', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container py-5">
      <h1 className="text-center mb-4">Iniciar sesión</h1>

      <form
        className="p-4 shadow rounded bg-light mx-auto"
        style={{ maxWidth: 420 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Correo electrónico
          </label>
          <input
            autoComplete="email"
            className="form-control"
            id="email"
            name="email"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={formValues.email}
            onChange={handleChange}
            required
            aria-invalid={status?.type === 'danger' && !!status.message}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Contraseña
          </label>
          <input
            className="form-control"
            id="password"
            name="password"
            type="password"
            minLength={6}
            placeholder="••••••"
            value={formValues.password}
            onChange={handleChange}
            required
            aria-invalid={status?.type === 'danger' && !!status.message}
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-info text-white" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
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
