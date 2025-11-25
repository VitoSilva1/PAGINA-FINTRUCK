// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogged, setIsLogged] = useState(false);

    // Recupera sesión al cargar la app
    useEffect(() => {
        const token = localStorage.getItem("fintrackAccessToken");
        if (token) setIsLogged(true);
    }, []);

    const login = () => setIsLogged(true);

    const logout = () => {
        localStorage.removeItem("fintrackAccessToken");
        localStorage.removeItem("fintrackUserEmail");
        localStorage.removeItem("fintrackUserId");

        setIsLogged(false);
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
