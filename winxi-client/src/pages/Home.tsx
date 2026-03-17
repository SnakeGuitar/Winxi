import React from 'react';
import Hero from '../features/home/components/Hero';
import MoodboardPreview from '../features/home/components/MoodboardPreview';
import FeatureGrid from '../features/home/components/FeatureGrid';
import Footer from '../components/Footer';
import { useScrollProgress } from '../features/home/hooks/useScrollProgress';

/**
 * Home page entry component.
 * Composes the Hero, MoodboardPreview, and FeatureGrid sections.
 */
const Home: React.FC = () => {
  const { scrollProgress, scrollOpacity, scrollTranslateX } = useScrollProgress();

  return (
    <div
      style={{
        minHeight: '100vh',
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden',
        background: '#ffffff',
      }}
    >
      <MoodboardPreview
        scrollOpacity={scrollOpacity}
        scrollTranslateX={scrollTranslateX}
        isVisible={scrollProgress < 1}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <FeatureGrid />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
