import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FADE_UP_ANIMATION } from '../constants/homeConstants';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ section with interactive accordion behavior.
 */
const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  const items = [
    { q: t('home.faq.q1'), a: t('home.faq.a1') },
    { q: t('home.faq.q2'), a: t('home.faq.a2') },
  ];

  return (
    <motion.section
      {...FADE_UP_ANIMATION(0.3)}
      style={{ padding: '120px 0', maxWidth: '800px', margin: '0 auto' }}
    >
      <h2 style={{ fontSize: '2.8rem', fontWeight: 800, textAlign: 'center', marginBottom: '60px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
        {t('home.faq.title')}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '20px', 
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.q}</h3>
              <motion.div animate={{ rotate: openIdx === idx ? 180 : 0 }}>
                <ChevronDown size={20} color="var(--text-muted)" />
              </motion.div>
            </div>
            {openIdx === idx && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                style={{ overflow: 'hidden', marginTop: '16px' }}
              >
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.1rem' }}>{item.a}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default FAQ;
