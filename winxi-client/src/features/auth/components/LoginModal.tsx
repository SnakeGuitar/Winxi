import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  /** Close when clicking the overlay (not the modal itself) */
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="auth-overlay"
      onClick={handleOverlayClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="auth-modal"
      >
        <h2 className="auth-title">{t('auth.login.title')}</h2>

        {error && (
          <p className="auth-error">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder={t('auth.login.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input auth-input"
            required
          />
          <input
            type="password"
            placeholder={t('auth.login.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input auth-input"
            required
          />
          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? t('auth.login.loading') : t('auth.login.submit')}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;