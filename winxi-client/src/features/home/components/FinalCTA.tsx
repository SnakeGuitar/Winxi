import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

/**
 * High-impact final CTA section before the footer.
 */
const FinalCTA: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      style={{
        margin: '100px 0',
        padding: '120px 40px',
        background: 'linear-gradient(135deg, #000 0%, #222 100%)',
        borderRadius: '48px',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: -100, left: -100, width: 300, height: 300, background: 'rgba(255,255,255,0.05)', filter: 'blur(80px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: -100, right: -100, width: 300, height: 300, background: 'rgba(255,255,255,0.05)', filter: 'blur(80px)', borderRadius: '50%' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '3.6rem', 
          fontWeight: 800, 
          marginBottom: '24px', 
          letterSpacing: '-0.04em',
          color: '#ffffff' 
        }}>
          {t('home.finalCta.headline')}
        </h2>
        <p style={{ fontSize: '1.3rem', color: 'rgba(255,255,255,0.85)', marginBottom: '50px', fontWeight: 400 }}>
          {t('home.finalCta.subheadline')}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary btn-lg"
          style={{ background: '#fff', color: '#000', border: 'none', padding: '18px 48px', fontSize: '1.1rem', fontWeight: 700 }}
        >
          {t('home.finalCta.btn')} <ArrowRight size={20} style={{ marginLeft: '8px' }} />
        </motion.button>
      </div>
    </motion.section>
  );
};

export default FinalCTA;
