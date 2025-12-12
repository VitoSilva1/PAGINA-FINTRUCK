import { useEffect, useMemo, useState } from 'react';

const indicatorsOrder = ['uf', 'dolar', 'euro', 'ipc', 'bitcoin'];

const formatValue = (value, unit) => {
  if (typeof value !== 'number') return '-';

  if (unit === 'Porcentaje') {
    return `${value.toFixed(2)}%`;
  }

  // Most indicators from mindicador.cl come in CLP ("Pesos")
  return value.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  });
};

export default function IndicatorsBanner() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadIndicators = async () => {
    try {
      setError('');
      const response = await fetch('https://mindicador.cl/api');
      if (!response.ok) throw new Error('No se pudo obtener indicadores');

      const data = await response.json();
      const selected = indicatorsOrder
        .map((key) => data[key])
        .filter(Boolean)
        .map((item) => ({
          key: item.codigo,
          name: item.nombre,
          value: item.valor,
          unit: item.unidad_medida,
          date: item.fecha
        }));

      setItems(selected);
    } catch (err) {
      setError('No pudimos cargar los indicadores en este momento');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIndicators();
    const interval = setInterval(loadIndicators, 10 * 60 * 1000); // refresco cada 10 minutos
    return () => clearInterval(interval);
  }, []);

  const lastUpdate = useMemo(() => {
    if (!items.length) return '';
    const dates = items
      .map((item) => item.date && new Date(item.date))
      .filter((date) => !Number.isNaN(date));
    if (!dates.length) return '';
    const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
    return latest.toLocaleDateString('es-CL');
  }, [items]);

  return (
    <div className="indicators-banner shadow-sm">
      <div className="container d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-white text-primary fw-semibold">Indicadores</span>
          <div className="text-white-50 small">
            {loading ? 'Cargando...' : lastUpdate ? `Actualizado ${lastUpdate}` : 'Sin fecha disponible'}
          </div>
        </div>

        {error ? (
          <div className="text-white small mb-0">{error}</div>
        ) : (
          <div className="d-flex flex-wrap justify-content-start justify-content-lg-end gap-2 w-100">
            {loading && (
              <div className="text-white small">Cargando indicadores...</div>
            )}
            {!loading &&
              items.map((item) => (
                <div key={item.key} className="indicator-pill d-flex align-items-center px-3 py-2">
                  <div className="indicator-name text-white-50 small me-2">{item.name}</div>
                  <div className="indicator-value fw-semibold text-white">
                    {formatValue(item.value, item.unit)}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
