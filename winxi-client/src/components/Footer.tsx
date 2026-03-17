import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * Shared footer component with social links and about information.
 */
const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer
      style={{
        marginTop: '120px',
        paddingTop: '80px',
        paddingBottom: '60px',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-primary)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{t('common.footer.about')}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>•</span>
            <a
              href="https://github.com/SnakeGuitar/Winxi"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              GitHub
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Winxi</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t('common.footer.by')}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>SnakeGuitar</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
