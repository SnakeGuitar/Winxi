import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout, Wand2, Share2 } from 'lucide-react';
import { FADE_UP_ANIMATION } from '../constants/homeConstants';
import FeatureCard from './FeatureCard';

/**
 * Component to present the features section on the home page.
 */
const FeatureGrid: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      key: 'design',
      icon: Layout,
    },
    {
      key: 'ai',
      icon: Wand2,
    },
    {
      key: 'collab',
      icon: Share2,
    },
  ];

  return (
    <>
      <motion.div
        {...FADE_UP_ANIMATION(0.25)}
        className="features-divider"
      />

      <motion.div
        {...FADE_UP_ANIMATION(0.4)}
        className="features-grid"
      >
        {features.map((f, i) => (
          <FeatureCard
            key={f.key}
            icon={f.icon}
            label={t(`home.features.${f.key}.label`)}
            title={t(`home.features.${f.key}.title`)}
            desc={t(`home.features.${f.key}.desc`)}
            delay={0.5 + i * 0.1}
          />
        ))}
      </motion.div>
    </>
  );
};

export default FeatureGrid;
