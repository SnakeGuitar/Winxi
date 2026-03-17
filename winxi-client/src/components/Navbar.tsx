import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="glass-panel" style={{
      position: 'fixed',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '1200px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 1000,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px var(--accent-glow)'
        }}>
          <Sparkles size={18} color="white" />
        </div>
        <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
          Winxi
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {['Moodboards', 'Inspire', 'Library'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}
            whileHover={{ color: 'var(--text-primary)' }}
          >
            {item}
          </motion.a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)'
          }}
        >
          Login
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--accent-glow)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '8px 20px',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'white',
            background: 'var(--accent-primary)',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
        >
          Get Started
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
