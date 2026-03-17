import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import NavLink from './NavLink';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const navLinks = [
    { key: 'moodboards', href: '#moodboards' },
    { key: 'inspire', href: '#inspire' },
    { key: 'library', href: '#library' },
  ];

  return (
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

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn btn-ghost btn-sm"
          style={{ color: 'var(--text-secondary)', borderColor: 'transparent' }}
        >
          {t('common.auth.login')}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn btn-primary btn-sm"
        >
          {t('common.auth.getStarted')}
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
