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
      style={{
        padding: '40px 32px 40px 0',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            background: 'rgba(0, 0, 0, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
          }}
        >
          <Icon size={18} />
        </div>
        <span
          style={{
            fontSize: '0.6rem',
            color: '#ccc',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      </div>

      <div>
        <h3
          style={{
            fontSize: '1.05rem',
            fontWeight: 600,
            color: '#000',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '0.85rem',
            color: '#888',
            lineHeight: 1.65,
            fontWeight: 400,
          }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
