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
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        transition: 'border-color 0.3s ease',
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
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          }}
        >
          <Icon size={18} />
        </div>
        <span
          style={{
            fontSize: '0.6rem',
            color: 'var(--text-muted)',
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
            color: 'var(--text-primary)',
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
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
