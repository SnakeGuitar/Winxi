import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FADE_UP_ANIMATION } from '../constants/homeConstants';

/**
 * Section inviting users to contribute to the project on GitHub.
 */
const GitHubCollab: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      {...FADE_UP_ANIMATION(0.2)}
      style={{
        padding: '100px 0',
        background: 'var(--bg-secondary)',
        borderRadius: '32px',
        margin: '60px 0',
        textAlign: 'center',
        border: '1px solid var(--border-color)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px' }}>
        <div 
          style={{ 
            display: 'inline-flex', 
            padding: '12px', 
            background: 'var(--text-primary)', 
            borderRadius: '16px', 
            color: 'var(--bg-primary)',
            marginBottom: '24px'
          }}
        >
          <Github size={32} />
        </div>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          {t('home.github.title')}
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px' }}>
          {t('home.github.desc')}
        </p>
        <motion.a
          href="https://github.com/SnakeGuitar/Winxi"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
        >
          <Github size={18} /> {t('home.github.btn')}
        </motion.a>
      </div>
    </motion.section>
  );
};

export default GitHubCollab;
