import React from 'react';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'ja', label: 'JA' },
  { code: 'zh', label: 'ZH' },
  { code: 'ko', label: 'KO' },
];

interface LanguageSelectorProps {
  currentLang: string;
  onLangChange: (lang: string) => void;
}

/**
 * Dropdown selector for switching application language.
 */
const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onLangChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
      <Globe size={13} color="#bbb" />
      <select
        value={currentLang}
        onChange={e => onLangChange(e.target.value)}
        style={{
          fontSize: '0.72rem',
          fontWeight: 500,
          color: '#666',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          padding: '2px 0',
          appearance: 'none',
          WebkitAppearance: 'none',
        }}
      >
        {LANGUAGES.map(l => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
