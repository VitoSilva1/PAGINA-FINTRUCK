const API_EXPENSE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';

const enviarGastos = async (gastos) => {
  const body = typeof gastos === 'string' ? gastos : JSON.stringify(gastos);
  const response = await fetch(`${API_EXPENSE_URL}/expenses/bulk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = data?.detail || 'Error al enviar los gastos';
    throw new Error(detail);
  }

  return data;
};

export { enviarGastos };
