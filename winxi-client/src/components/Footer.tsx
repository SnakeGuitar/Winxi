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
        borderTop: '1px solid rgba(0,0,0,0.06)',
        background: '#ffffff',
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
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#000' }}>{t('common.footer.about')}</span>
            <span style={{ fontSize: '0.7rem', color: '#bbb' }}>•</span>
            <a
              href="https://github.com/SnakeGuitar/Winxi"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.8rem', color: '#888', textDecoration: 'none' }}
            >
              GitHub
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#000' }}>Winxi</span>
            <span style={{ fontSize: '0.7rem', color: '#bbb' }}>{t('common.footer.by')}</span>
            <a
              href="https://x.com/SnakeGuitar"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.8rem', fontWeight: 600, color: '#000', textDecoration: 'none' }}
            >
              @SnakeGuitar
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
