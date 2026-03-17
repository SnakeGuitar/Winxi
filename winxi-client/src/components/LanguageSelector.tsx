import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'ja', label: '日本語', short: 'JA' },
  { code: 'zh', label: '中文', short: 'ZH' },
  { code: 'ko', label: '한국어', short: 'KO' },
];

interface LanguageSelectorProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
}

/**
 * Premium custom dropdown for switching application language.
 * Uses Framer Motion for animations and glassmorphism for styling.
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onLangChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', userSelect: 'none' }}>
      <motion.div
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ background: 'rgba(0,0,0,0.03)' }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <Globe size={14} color="#555" />
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#333' }}>
          {currentOption.short}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={12} color="#999" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 5, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              minWidth: '140px',
              padding: '6px',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              borderRadius: '16px',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              zIndex: 100,
            }}
          >
            {LANGUAGES.map((lang) => (
              <motion.div
                key={lang.code}
                role="option"
                aria-selected={currentLang === lang.code}
                onClick={() => {
                  onLangChange(lang.code);
                  setIsOpen(false);
                }}
                whileHover={{ background: 'rgba(0,0,0,0.04)', x: 2 }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'background 0.2s ease',
                }}
              >
                <span style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: currentLang === lang.code ? 600 : 400,
                  color: currentLang === lang.code ? '#000' : '#666'
                }}>
                  {lang.label}
                </span>
                {currentLang === lang.code && (
                  <motion.div 
                    layoutId="active-dot" 
                    style={{ width: 4, height: 4, borderRadius: '50%', background: '#000' }} 
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
