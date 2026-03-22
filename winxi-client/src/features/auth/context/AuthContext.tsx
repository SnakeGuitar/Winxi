import React, { createContext, useCallback, useEffect, useState } from 'react';
import * as authService from '../services/authService';

/* ─── Types ─── */

interface AuthUser {
  /** We only know the user is authenticated; extend with profile data later */
  isAuthenticated: true;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/* ─── Context ─── */

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ─── Provider ─── */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check if there is a stored token
  useEffect(() => {
    const token = authService.getAccessToken();
    if (token) {
      // We have a stored token — assume authenticated.
      // A more robust approach would validate the token against the backend.
      setUser({ isAuthenticated: true });
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    await authService.login(username, password);
    setUser({ isAuthenticated: true });
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
