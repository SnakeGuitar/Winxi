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
      className="hero-section"
    >
      <span className="label hero-label">
        {t('home.hero.eyebrow')}
      </span>

      <h1 className="hero-title">
        {t('home.hero.headline')}
      </h1>

      <p className="hero-desc">
        {t('home.hero.body')}
      </p>

      <div className="hero-actions">
        <motion.button
          className="btn btn-primary btn-lg hero-btn-primary"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
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
