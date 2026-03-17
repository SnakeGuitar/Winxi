import React from 'react';
import { motion } from 'framer-motion';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * Reusable navigation link with hover animations.
 */
const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <motion.a
      href={href}
      style={{
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        fontWeight: 500,
        letterSpacing: '0.01em',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'color 0.3s ease',
      }}
      whileHover={{ color: 'var(--text-primary)' }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
};

export default NavLink;
