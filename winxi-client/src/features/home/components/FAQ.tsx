import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FADE_UP_ANIMATION } from '../constants/homeConstants';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ section with interactive accordion behavior.
 */
const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  const items = [
    { q: t('home.faq.q1'), a: t('home.faq.a1') },
    { q: t('home.faq.q2'), a: t('home.faq.a2') },
  ];

  return (
    <motion.section
      {...FADE_UP_ANIMATION(0.3)}
      className="faq-section"
    >
      <h2 className="faq-title">
        {t('home.faq.title')}
      </h2>
      <div className="faq-list">
        {items.map((item, idx) => (
          <div 
            key={idx}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="faq-item"
          >
            <div className="faq-header">
              <h3 className="faq-question">{item.q}</h3>
              <motion.div animate={{ rotate: openIdx === idx ? 180 : 0 }}>
                <ChevronDown size={20} color="var(--text-muted)" />
              </motion.div>
            </div>
            {openIdx === idx && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="faq-answer-container"
              >
                <p className="faq-answer">{item.a}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default FAQ;
