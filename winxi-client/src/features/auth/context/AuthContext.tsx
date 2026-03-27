import React, { createContext, useCallback, useEffect, useState } from 'react';
import * as authService from '../services/authService';

/* ─── Types ─── */

interface AuthUser {
  isAuthenticated: true;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/* ─── Context ─── */

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ─── Helpers ─── */

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return typeof payload.exp === 'number' && payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

/* ─── Provider ─── */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = authService.getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    if (!isTokenExpired(token)) {
      setUser({ isAuthenticated: true });
      setIsLoading(false);
      return;
    }

    authService.refreshAccessToken()
      .then(() => setUser({ isAuthenticated: true }))
      .catch(() => authService.clearTokens())
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    await authService.login(username, password);
    setUser({ isAuthenticated: true });
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    await authService.register(username, email, password);
    setUser({ isAuthenticated: true });
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
