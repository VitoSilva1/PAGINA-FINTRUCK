import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProfile } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const quickStats = [
  { label: 'Gastos del mes', description: 'Registra tus gastos para ver métricas.' },
  { label: 'Metas activas', description: 'Pronto podrás definir metas de ahorro.' },
  { label: 'Alertas', description: 'Sin alertas por ahora.' }
];

const Profile = () => {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: '' });
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('fintrackAccessToken') || '';
    const storedEmail = localStorage.getItem('fintrackUserEmail') || '';
    setEmail(storedEmail);

    if (!token) {
      setStatus({ loading: false, error: '' });
      return;
    }

    const loadProfile = async () => {
      try {
        const data = await getProfile(token);
        setProfile(data);
        setStatus({ loading: false, error: '' });
      } catch (error) {
        setStatus({ loading: false, error: error.message || 'No se pudo cargar el perfil.' });
      }
    };

    loadProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const hasSession = !!localStorage.getItem('fintrackAccessToken');

  if (!hasSession) {
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
          {profile?.first_name && (
            <p className="text-muted mb-0">
              {profile.first_name} {profile.last_name || ''}
            </p>
          )}
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

      {/* {status.loading && (
        <div className="alert alert-info" role="status">
          Cargando tu perfil...
        </div>
      )}
      {status.error && (
        <div className="alert alert-warning" role="alert">
          {status.error}
        </div>
      )} */}

      <div className="row g-4">
        {quickStats.map((stat) => (
          <div className="col-md-4" key={stat.label}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title mt-1">{stat.label}</h5>
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
