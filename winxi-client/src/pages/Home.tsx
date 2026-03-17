import React from 'react';
import Hero from '../features/home/components/Hero';
import MoodboardPreview from '../features/home/components/MoodboardPreview';
import FeatureGrid from '../features/home/components/FeatureGrid';
import DetailedFeatures from '../features/home/components/DetailedFeatures';
import GitHubCollab from '../features/home/components/GitHubCollab';
import FAQ from '../features/home/components/FAQ';
import FinalCTA from '../features/home/components/FinalCTA';
import Footer from '../components/Footer';
import { useScrollProgress } from '../features/home/hooks/useScrollProgress';

/**
 * Home page entry component.
 * Composes the Hero, MoodboardPreview, and FeatureGrid sections.
 */
const Home: React.FC = () => {
  const { scrollOpacity, scrollTranslateX, isVisible } = useScrollProgress();

  return (
    <div style={{ 
      backgroundColor: 'var(--bg-primary)', 
      minHeight: '100vh', 
      overflowX: 'hidden',
      transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative'
    }}>
      <div className="container">
        <Hero />
        <MoodboardPreview
          scrollOpacity={scrollOpacity}
          scrollTranslateX={scrollTranslateX}
          isVisible={isVisible}
        />
        <FeatureGrid />

        <DetailedFeatures />

        <GitHubCollab />

        <FAQ />

        <FinalCTA />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
