import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Register = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formValues.firstName.trim() || !formValues.lastName.trim() || !formValues.email.trim() || !formValues.password) {
      return 'Por favor completa todos los campos.';
    }
    if (!emailPattern.test(formValues.email.trim())) {
      return 'Ingresa un correo electrónico válido.';
    }
    if (formValues.password.length < 6) {
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

    try {
      setIsSubmitting(true);
      setStatus(null);
      await registerUser({
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        email: formValues.email.trim(),
        password: formValues.password
      });

      setStatus({ type: 'success', message: 'Usuario registrado con éxito.' });
      setFormValues(initialState);

      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      setStatus({ type: 'danger', message: error.message || 'No se pudo completar el registro.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container py-5">
      <h1 className="text-center mb-4">Crear Cuenta</h1>
      <form
        className="p-4 shadow rounded bg-light mx-auto"
        style={{ maxWidth: 420 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-3">
          <label className="form-label" htmlFor="firstName">
            Nombres
          </label>
          <input
            className="form-control"
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            required
            type="text"
            value={formValues.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="lastName">
            Apellidos
          </label>
          <input
            className="form-control"
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            required
            type="text"
            value={formValues.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="form-control"
            id="email"
            name="email"
            autoComplete="email"
            required
            type="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Contraseña
          </label>
          <input
            className="form-control"
            id="password"
            minLength={6}
            name="password"
            autoComplete="new-password"
            required
            type="password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-info text-white" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Creando cuenta...' : 'Registrar'}
          </button>
        </div>

        {status && (
          <div className={`alert alert-${status.type} mt-3`} role="alert">
            {status.message}
          </div>
        )}

        <p className="mt-3 text-center">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
