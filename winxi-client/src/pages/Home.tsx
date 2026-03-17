import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Wand2, Share2 } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    className="glass-card"
    whileHover={{ scale: 1.02 }}
    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
  >
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: 'rgba(59, 130, 246, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--accent-primary)'
    }}>
      <Icon size={24} />
    </div>
    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{description}</p>
  </motion.div>
);

const Home: React.FC = () => {
  return (
    <div style={{ padding: '160px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '80px' }}
      >
        <span style={{ 
          fontSize: '0.9rem', 
          fontWeight: 600, 
          color: 'var(--accent-primary)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.1em',
          marginBottom: '16px',
          display: 'block'
        }}>
          Aesthetics for Creators
        </span>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '24px' }}>
          Organize Your Vision with Winxi
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
          The premium workspace for moodboards, style guides, and creative inspiration. Built for designers who care about the details.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <motion.button
            className="glass-panel"
            whileHover={{ scale: 1.05, background: 'var(--accent-primary)', color: 'white' }}
            style={{ padding: '14px 32px', fontSize: '1.1rem', fontWeight: 600 }}
          >
            Start Creating
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{ padding: '14px 32px', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}
          >
            Watch Demo
          </motion.button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px', 
        width: '100%', 
        maxWidth: '1200px' 
      }}>
        <FeatureCard 
          icon={Layout}
          title="Intuitive Layouts"
          description="Drag and drop elements to create the perfect composition for your ideas."
        />
        <FeatureCard 
          icon={Wand2}
          title="AI Inspiration"
          description="Generate color palettes and style suggestions based on your moodboard content."
        />
        <FeatureCard 
          icon={Share2}
          title="Seamless Sharing"
          description="Collaborate with your team or share your vision with clients in one click."
        />
      </div>

      {/* Abstract Background Elements */}
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 70%)',
        filter: 'blur(60px)',
        zIndex: -1
      }} />
      <div style={{
        position: 'fixed',
        bottom: '10%',
        right: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(147, 51, 234, 0.05) 0%, rgba(147, 51, 234, 0) 70%)',
        filter: 'blur(80px)',
        zIndex: -1
      }} />
    </div>
  );
};

export default Home;
