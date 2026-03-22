import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Convenience hook to access the auth context.
 * Must be used inside an <AuthProvider>.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
