import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="container py-5 text-center">
    <h1 className="display-4 fw-bold mb-3">404</h1>
    <p className="lead mb-4">La página que buscas no existe o fue movida.</p>
    <Link className="btn btn-info text-white" to="/">
      Volver al inicio
    </Link>
  </section>
);

export default NotFound;
