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
        color: '#999',
        fontWeight: 400,
        letterSpacing: '0.01em',
        textDecoration: 'none',
      }}
      whileHover={{ color: '#000000' }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.a>
  );
};

export default NavLink;
