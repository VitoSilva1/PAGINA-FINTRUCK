import { useState } from 'react';

const initialState = {
  nombre: '',
  email: '',
  asunto: '',
  mensaje: ''
};

const Contact = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setStatus({
      type: 'success',
      message: `¡Gracias por contactarnos, ${formValues.nombre}! Te responderemos pronto.`
    });
    setFormValues(initialState);
  };

  return (
    <section className="flex-fill container py-5">
      <h1 className="text-center mb-4">Contáctanos</h1>
      <p className="text-center text-muted mb-5">
        Completa el formulario y un especialista se pondrá en contacto contigo.
      </p>

      <form className="p-4 shadow rounded bg-light mx-auto" style={{ maxWidth: 600 }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label fw-bold">
            Nombre Completo
          </label>
          <input
            className="form-control"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre"
            required
            type="text"
            value={formValues.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Correo Electrónico
          </label>
          <input
            className="form-control"
            id="email"
            name="email"
            placeholder="tucorreo@ejemplo.com"
            required
            type="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="asunto" className="form-label fw-bold">
            Asunto
          </label>
          <input
            className="form-control"
            id="asunto"
            name="asunto"
            placeholder="Motivo de contacto"
            required
            type="text"
            value={formValues.asunto}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label fw-bold">
            Mensaje
          </label>
          <textarea
            className="form-control"
            id="mensaje"
            name="mensaje"
            placeholder="Escribe tu mensaje aquí..."
            required
            rows="5"
            value={formValues.mensaje}
            onChange={handleChange}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-info text-white">
            Enviar Mensaje
          </button>
        </div>

        {status && (
          <div className={`alert alert-${status.type} mt-3`} role="alert">
            {status.message}
          </div>
        )}
      </form>
    </section>
  );
};

export default Contact;
