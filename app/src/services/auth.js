const API_AUTH_URL =
  import.meta.env.VITE_AUTH_SERVICE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8001';

const API_USER_URL =
  import.meta.env.VITE_USER_SERVICE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8000';

const parseResponse = async (response) => {
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const detail = body?.detail;
    const message = Array.isArray(detail) ? detail.join(', ') : detail || 'Ocurrió un error inesperado.';
    throw new Error(message);
  }

  return body;
};

const decodeBase64Url = (segment) => {
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const decodeBinary = (value) => {
    if (typeof atob === 'function') {
      return atob(value);
    }
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(value, 'base64').toString('binary');
    }
    throw new Error('No hay un decodificador base64 disponible.');
  };
  const decoded = decodeBinary(base64);
  const uriSafe = decoded
    .split('')
    .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
    .join('');
  return decodeURIComponent(uriSafe);
};

export const decodeAccessToken = (token) => {
  try {
    if (!token) return null;
    const [, payload] = token.split('.');
    if (!payload) return null;
    return JSON.parse(decodeBase64Url(payload));
  } catch (error) {
    console.error('No se pudo decodificar el token JWT.', error);
    return null;
  }
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_AUTH_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  return parseResponse(response);
};

export const registerUser = async ({ firstName, lastName, email, password }) => {
  const response = await fetch(`${API_USER_URL}/users/register`, {
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
