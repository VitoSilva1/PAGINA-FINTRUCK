import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

import ProtectedRoute from './ProtectedRoutes';

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

const { useAuth } = await import('../context/AuthContext');

describe('ProtectedRoute', () => {
  it('redirects to /login when not authenticated', () => {
    useAuth.mockReturnValue({ isLogged: false });

    render(
      <MemoryRouter initialEntries={['/privado']}>
        <Routes>
          <Route
            path="/privado"
            element={
              <ProtectedRoute>
                <div>Privado</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    useAuth.mockReturnValue({ isLogged: true });

    render(
      <MemoryRouter initialEntries={['/privado']}>
        <Routes>
          <Route
            path="/privado"
            element={
              <ProtectedRoute>
                <div>Privado</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Privado')).toBeInTheDocument();
  });
});
