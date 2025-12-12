import { act, renderHook, waitFor } from '@testing-library/react';

import { AuthProvider, useAuth } from './AuthContext';

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts unauthenticated when no token exists', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.isLogged).toBe(false);
  });

  it('sets logged state to true if a token is stored on mount', async () => {
    localStorage.setItem('fintrackAccessToken', 'token');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.isLogged).toBe(true);
    });
  });

  it('sets logged to false when token is expired', async () => {
    const createToken = (payload) => {
      const base64Url = (obj) =>
        btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      return `${base64Url({ alg: 'HS256', typ: 'JWT' })}.${base64Url(payload)}.sig`;
    };
    const expired = Math.floor(Date.now() / 1000) - 60;
    const token = createToken({ sub: 'user-1', exp: expired });
    localStorage.setItem('fintrackAccessToken', token);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.isLogged).toBe(false);
    });
  });

  it('login() toggles the authentication state to true', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login();
    });

    expect(result.current.isLogged).toBe(true);
  });

  it('logout() clears session data and toggles authentication state to false', () => {
    localStorage.setItem('fintrackAccessToken', 'token');
    localStorage.setItem('fintrackUserEmail', 'user@example.com');
    localStorage.setItem('fintrackUserId', '123');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.isLogged).toBe(false);
    expect(localStorage.getItem('fintrackAccessToken')).toBeNull();
    expect(localStorage.getItem('fintrackUserEmail')).toBeNull();
    expect(localStorage.getItem('fintrackUserId')).toBeNull();
  });
});
