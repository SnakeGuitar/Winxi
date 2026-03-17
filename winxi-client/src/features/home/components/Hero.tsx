import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FADE_UP_ANIMATION } from '../constants/homeConstants';

/**
 * Hero section for the home page.
 * Displays the main headline, description, and primary CTAs.
 */
const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      {...FADE_UP_ANIMATION(0)}
      style={{
        paddingTop: '100px',
        paddingBottom: '0',
        maxWidth: '540px',
      }}
    >
      <span
        className="label"
        style={{ marginBottom: '24px', display: 'block', color: 'var(--text-muted)' }}
      >
        {t('home.hero.eyebrow')}
      </span>

      <h1
        style={{
          fontSize: 'clamp(2.8rem, 6vw, 4.6rem)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          color: 'var(--text-primary)',
          marginBottom: '28px',
          whiteSpace: 'pre-line',
          transition: 'color 0.3s ease',
        }}
      >
        {t('home.hero.headline')}
      </h1>

      <p
        style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '420px',
          marginBottom: '44px',
          fontWeight: 400,
          transition: 'color 0.3s ease',
        }}
      >
        {t('home.hero.body')}
      </p>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
        <motion.button
          className="btn btn-primary btn-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {t('common.buttons.startCreating')} <ArrowRight size={16} />
        </motion.button>
        <motion.button
          className="btn btn-ghost btn-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {t('common.buttons.viewProjects')}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Hero;
