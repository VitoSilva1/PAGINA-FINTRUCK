// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { decodeAccessToken } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  const clearSession = () => {
    localStorage.removeItem('fintrackAccessToken');
    localStorage.removeItem('fintrackUserEmail');
    localStorage.removeItem('fintrackUserId');
    setIsLogged(false);
  };

  // Recupera sesión al cargar la app y valida expiración del token
  useEffect(() => {
    const token = localStorage.getItem('fintrackAccessToken');
    const decoded = decodeAccessToken(token);
    const isExpired = decoded?.exp ? decoded.exp * 1000 < Date.now() : false;
    if (token && !isExpired) {
      setIsLogged(true);
    } else {
      clearSession();
    }

    const handleStorage = (event) => {
      if (event.key === 'fintrackAccessToken') {
        const nextToken = event.newValue;
        const nextDecoded = decodeAccessToken(nextToken);
        const nextExpired = nextDecoded?.exp ? nextDecoded.exp * 1000 < Date.now() : false;
        if (nextToken && !nextExpired) {
          setIsLogged(true);
        } else {
          clearSession();
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = () => setIsLogged(true);

  const logout = () => {
    clearSession();
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
