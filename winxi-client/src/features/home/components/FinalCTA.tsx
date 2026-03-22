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
      className="cta-section"
    >
      {/* Decorative blobs */}
      <div className="cta-blob cta-blob-1" />
      <div className="cta-blob cta-blob-2" />

      <div className="cta-content">
        <h2 className="cta-title">
          {t('home.finalCta.headline')}
        </h2>
        <p className="cta-desc">
          {t('home.finalCta.subheadline')}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary btn-lg cta-btn"
        >
          {t('home.finalCta.btn')} <ArrowRight size={20} className="cta-btn-icon" />
        </motion.button>
      </div>
    </motion.section>
  );
};

export default FinalCTA;
