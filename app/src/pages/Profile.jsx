import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const quickStats = [
  { label: 'Gastos del mes', description: 'Registra tus gastos para ver métricas.', icon: '💸' },
  { label: 'Metas activas', description: 'Pronto podrás definir metas de ahorro.', icon: '🎯' },
  { label: 'Alertas', description: 'Sin alertas por ahora.', icon: '🔔' }
];

const Profile = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem('fintrackUserEmail') || '');
    setToken(localStorage.getItem('fintrackAccessToken') || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fintrackAccessToken');
    localStorage.removeItem('fintrackUserEmail');
    localStorage.removeItem('fintrackUserId');
    navigate('/');
  };

  if (!token) {
    return (
      <section className="container py-5 text-center">
        <h1 className="mb-3">Tu perfil</h1>
        <p className="text-muted">
          Inicia sesión para ver tu información financiera personalizada.
        </p>
        <Link className="btn btn-info text-white" to="/login">
          Ir a iniciar sesión
        </Link>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="mb-1">Bienvenido de nuevo</h1>
          <p className="text-muted mb-0">{email}</p>
        </div>
        <div className="d-flex gap-2">
          <Link className="btn btn-outline-info" to="/expenses">
            Gestionar gastos
          </Link>
          <button className="btn btn-dark" type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="row g-4">
        {quickStats.map((stat) => (
          <div className="col-md-4" key={stat.label}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <div className="display-6">{stat.icon}</div>
                <h5 className="card-title mt-3">{stat.label}</h5>
                <p className="card-text text-muted">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h2 className="h4">Próximos pasos</h2>
          <p className="text-muted">
            Muy pronto podrás visualizar gráficos de tus gastos, definir presupuestos y recibir alertas
            personalizadas. Mientras tanto puedes seguir registrando tus gastos en la sección dedicada.
          </p>
          <Link className="btn btn-info text-white" to="/expenses">
            Registrar un nuevo gasto
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;
