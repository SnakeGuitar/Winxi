import React from 'react';
import linImg from '../../../assets/lin.png';
import izuImg from '../../../assets/izu.jpg';
import laylaImg from '../../../assets/layla.png';
import { useTranslation } from 'react-i18next';
import { HOME_PALETTE } from '../constants/homeConstants';

interface MoodboardPreviewProps {
  scrollOpacity: number;
  scrollTranslateX: number;
  isVisible: boolean;
}

/**
 * Component to present the moodboard collage preview.
 * Handles both desktop and mobile layouts with scroll-linked animations.
 */
const MoodboardPreview: React.FC<MoodboardPreviewProps> = ({
  scrollOpacity,
  scrollTranslateX,
  isVisible,
}) => {
  const { t } = useTranslation();
  const tags = t('home.collage.tags', { returnObjects: true }) as string[];

  return (
    <>
      <div
        className="collage-grid"
        style={{
          opacity: scrollOpacity,
          transform: `translateX(${scrollTranslateX}px)`,
          visibility: isVisible ? 'visible' : 'hidden',
          transition: 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="collage-grid__header">
          <span className="collage-mobile__label">{t('home.collage.by')}</span>
          <span className="collage-mobile__title" style={{ color: 'var(--text-primary)' }}>{t('home.collage.title')}</span>
        </div>

        <img src={linImg} alt="lin character" className="collage-grid__img collage-grid__img--main" />

        <img src={izuImg} alt="izu character" className="collage-grid__img" style={{ aspectRatio: '1' }} />

        <img src={laylaImg} alt="layla character" className="collage-grid__img" style={{ aspectRatio: '1.1' }} />

        <div className="collage-grid__meta">
          <div className="collage-mock-palette">
            {HOME_PALETTE.map((c, i) => (
              <div key={`palette-${i}`} className="collage-mock-swatch" style={{ background: c }} />
            ))}
          </div>
          <div className="collage-mock-tags">
            {tags.map((tag, i) => (
              <span key={`tag-${i}`} className="collage-mock-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="collage-grid__note">
          <p className="collage-mock-note__heading" style={{ color: 'var(--text-primary)' }}>{t('home.collage.noteHeading')}</p>
          <p className="collage-mock-note__body" style={{ color: 'var(--text-secondary)' }}>{t('home.collage.noteBody')}</p>
        </div>
      </div>

      <div className="collage-mobile">
        <div className="collage-mobile__header">
          <span className="collage-mobile__label">{t('home.collage.by')}</span>
          <span className="collage-mobile__title" style={{ color: 'var(--text-primary)' }}>{t('home.collage.title')}</span>
        </div>

        <div className="collage-mobile__images">
          <img src={linImg} alt="lin character" className="collage-mobile__img" />
          <img src={izuImg} alt="izu character" className="collage-mobile__img" />
          <img src={laylaImg} alt="layla character" className="collage-mobile__img" />
        </div>

        <div className="collage-mobile__row">
          <div className="collage-mock-palette">
            {HOME_PALETTE.map((c, i) => (
              <div key={`palette-${i}`} className="collage-mock-swatch" style={{ background: c }} />
            ))}
          </div>
          <div className="collage-mock-tags">
            {tags.map((tag, i) => (
              <span key={`tag-${i}`} className="collage-mock-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="collage-mock-note">
          <p className="collage-mock-note__heading" style={{ color: 'var(--text-primary)' }}>{t('home.collage.noteHeading')}</p>
          <p className="collage-mock-note__body" style={{ color: 'var(--text-secondary)' }}>
            {t('home.collage.noteBody')}
          </p>
        </div>
      </div>
    </>
  );
};

export default MoodboardPreview;
