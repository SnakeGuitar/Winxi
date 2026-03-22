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
      className="github-section"
    >
      <div className="github-container">
        <div className="github-icon-wrap">
          <Github size={32} />
        </div>
        <h2 className="github-title">
          {t('home.github.title')}
        </h2>
        <p className="github-desc">
          {t('home.github.desc')}
        </p>
        <motion.a
          href="https://github.com/SnakeGuitar/Winxi"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg github-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={18} /> {t('home.github.btn')}
        </motion.a>
      </div>
    </motion.section>
  );
};

export default GitHubCollab;
