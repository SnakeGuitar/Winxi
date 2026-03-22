import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  label: string;
  title: string;
  desc: string;
  delay: number;
}

/**
 * Component for a single feature card on the home page.
 */
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, label, title, desc, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7 }}
      className="feature-card"
    >
      <div className="feature-header">
        <div className="feature-icon-wrap">
          <Icon size={18} />
        </div>
        <span className="feature-label">
          {label}
        </span>
      </div>

      <div>
        <h3 className="feature-title">
          {title}
        </h3>
        <p className="feature-desc">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
