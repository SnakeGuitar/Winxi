import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import NavLink from './NavLink';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../features/auth/hooks/useAuth';
import LoginModal from '../features/auth/components/LoginModal';
import SignupModal from '../features/auth/components/SignupModal';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);

  const navLinks = [
    { key: 'moodboards', href: '#moodboards' },
    { key: 'inspire', href: '#inspire' },
    { key: 'library', href: '#library' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          zIndex: 1000,
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          borderBottom: '1px solid var(--border-color)',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}
          >
            Winxi
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '36px', flexShrink: 0 }}>
          {navLinks.map((link) => (
            <NavLink key={link.key} href={link.href}>
              {t(`common.nav.${link.key}`)}
            </NavLink>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LanguageSelector
            currentLang={i18n.language}
            onLangChange={(l) => i18n.changeLanguage(l)}
          />

          <ThemeToggle />

          {user ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-ghost btn-sm"
              style={{ color: 'var(--text-secondary)', borderColor: 'transparent' }}
              onClick={logout}
            >
              {t('common.auth.logout')}
            </motion.button>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-ghost btn-sm"
                style={{ color: 'var(--text-secondary)', borderColor: 'transparent' }}
                onClick={() => setShowLogin(true)}
              >
                {t('common.auth.login')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-primary btn-sm"
                onClick={() => setShowSignup(true)}
              >
                {t('common.auth.getStarted')}
              </motion.button>
            </>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
