import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FADE_UP_ANIMATION } from '../constants/homeConstants';

/**
 * Detailed feature sections with alternating image/text layouts (Z-pattern).
 */
const DetailedFeatures: React.FC = () => {
  const { t } = useTranslation();

  const sections = [
    {
      key: 'canvas',
      reverse: false,
    },
    {
      key: 'ai',
      reverse: true,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '160px', marginTop: '120px' }}>
      {sections.map((section) => (
        <motion.div
          key={section.key}
          {...FADE_UP_ANIMATION(0.2)}
          style={{
            display: 'flex',
            flexDirection: section.reverse ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: '80px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: '1', minWidth: '320px' }}>
            <div 
              style={{ 
                width: '100%', 
                aspectRatio: '16/9',
                borderRadius: '24px', 
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div 
                style={{ 
                  width: '60%', 
                  height: '40%', 
                  borderRadius: '12px', 
                  background: section.key === 'canvas' ? 'var(--accent-teal)' : 'var(--accent-rose)',
                  opacity: 0.15
                }} 
              />
            </div>
          </div>
          <div style={{ flex: '1', minWidth: '320px' }}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}>
              {t(`home.detailedFeatures.${section.key}.title`)}
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {t(`home.detailedFeatures.${section.key}.desc`)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DetailedFeatures;
