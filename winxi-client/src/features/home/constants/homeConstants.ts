import { Layout, Wand2, Share2 } from 'lucide-react';

export const FADE_UP_ANIMATION = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.4, 0, 0.2, 1] as const },
});

export const FEATURES = [
  {
    icon: Layout,
    label: 'Design',
    title: 'Intuitive Layouts',
    desc: 'Drag and drop elements to compose the perfect board for your creative vision.',
  },
  {
    icon: Wand2,
    label: 'AI',
    title: 'AI Inspiration',
    desc: 'Generate palettes and style suggestions directly from your moodboard content.',
  },
  {
    icon: Share2,
    label: 'Collab',
    title: 'Seamless Sharing',
    desc: 'Share your boards with anyone and collaborate in real-time on mood creation.',
  },
] as const;

export const HOME_PALETTE = ['#f4a7b9', '#c9b8f0', '#87c5ea', '#f9dde6', '#e8e0f8'];
export const HOME_TAGS = ['soft girl', 'anime', 'pastel', 'ethereal', '2D'];
