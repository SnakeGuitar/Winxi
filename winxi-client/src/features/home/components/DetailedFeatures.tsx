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
    <div className="detailed-section">
      {sections.map((section) => (
        <motion.div
          key={section.key}
          {...FADE_UP_ANIMATION(0.2)}
          className={`detailed-row ${section.reverse ? 'detailed-row--reverse' : ''}`}
        >
          <div className="detailed-img-col">
            <div className="detailed-img-wrap">
              <div className={`detailed-img-inner detailed-img-inner--${section.key}`} />
            </div>
          </div>
          <div className="detailed-text-col">
            <h2 className="detailed-title">
              {t(`home.detailedFeatures.${section.key}.title`)}
            </h2>
            <p className="detailed-desc">
              {t(`home.detailedFeatures.${section.key}.desc`)}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DetailedFeatures;
