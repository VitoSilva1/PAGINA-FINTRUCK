import { Link } from 'react-router-dom';
import heroVideo from '../assets/video/video.mp4';
import investigaImg from '../assets/img/Investiga.png';
import planificaImg from '../assets/img/Planifica.png';
import presupuestaImg from '../assets/img/Presupuesta.png';

const highlights = [
  {
    title: 'Investiga antes de decidir',
    description:
      'Conocer tus opciones es el primer paso para manejar mejor tu dinero. Compara alternativas y toma decisiones seguras.',
    image: investigaImg,
    alt: 'Control de gastos'
  },
  {
    title: 'Planifica tu futuro financiero',
    description:
      'Define metas claras y traza el camino para alcanzarlas. Convierte tus finanzas en una herramienta para tu tranquilidad.',
    image: planificaImg,
    alt: 'Metas financieras'
  },
  {
    title: 'Presupuesta con claridad',
    description:
      'Organiza tus ingresos y gastos en un plan realista. Anticipa, controla y aprovecha cada peso que ganas.',
    image: presupuestaImg,
    alt: 'Seguridad financiera'
  }
];

const Home = () => (
  <div className="container py-3">
    <section className="text-center mb-5 hero-section" id="Nosotros">
      <h1 className="display-4 fw-bold">Bienvenido a Fin-Track</h1>
      <p className="lead">
        Tu plataforma para organizar finanzas, controlar gastos y alcanzar tus metas financieras de manera fácil.
      </p>
      <div className="d-flex gap-3 justify-content-center flex-wrap">
        <Link to="/register" className="btn btn-info text-white btn-lg">
          Crea tu cuenta
        </Link>
        <Link to="/subscription" className="btn btn-outline-info btn-lg text-dark">
          Conoce nuestros planes
        </Link>
      </div>
    </section>

    <section className="mb-5">
      <h2 className="h3 text-center mb-3">Conoce cómo funciona</h2>
      <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm video-wrapper">
        <video autoPlay muted loop playsInline>
          <source src={heroVideo} type="video/mp4" />
          Tu navegador no soporta este video.
        </video>
      </div>
    </section>

    <article className="card shadow-sm p-3 mb-5" id="Consejos">
      <div className="card-body">
        <h2 className="card-title h4">Consejos Financieros</h2>
        <p className="card-text">Aprende a presupuestar, ahorrar e invertir con nuestras guías prácticas.</p>
        <button className="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#extraContent">
          Leer más
        </button>
        <div className="collapse mt-3" id="extraContent">
          <div className="card card-body border-0">
            Aquí encontrarás estrategias más avanzadas para el manejo de tus finanzas:
            <ul>
              <li>Cómo crear un presupuesto mensual efectivo.</li>
              <li>Técnicas para reducir deudas de manera progresiva.</li>
              <li>Consejos para ahorrar e invertir con bajo riesgo.</li>
            </ul>
            <p className="mb-0">Recuerda: el orden financiero es la base de tu tranquilidad.</p>
          </div>
        </div>
      </div>
    </article>

    <section className="container mb-5">
      <h2 className="text-center mb-4">¿Por qué elegir Fin-Track?</h2>
      <div className="row g-4">
        {highlights.map((item) => (
          <div className="col-lg-4 col-md-6" key={item.title}>
            <div className="card h-100 shadow-sm">
              <img src={item.image} className="card-img-top" alt={item.alt} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Home;
