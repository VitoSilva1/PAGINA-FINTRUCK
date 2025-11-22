const API_AUTH_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const parseResponse = async (response) => {
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = body?.detail;
    const message = Array.isArray(detail) ? detail.join(', ') : detail || 'Ocurrió un error inesperado.';
    throw new Error(message); ``
  }

  return body;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_AUTH_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  return parseResponse(response);
};

export const registerUser = async ({ firstName, lastName, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email,
      password
    })
  });

  return parseResponse(response);
};
