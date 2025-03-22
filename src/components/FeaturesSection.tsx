
import { useState, useRef, useEffect } from 'react';
import { cn, handleMouseMove } from '@/lib/utils';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    id: '1',
    title: 'Intuitive Interface',
    description: 'Clean and minimal design that puts your content first. Navigate with ease and confidence.',
    icon: '🎨',
  },
  {
    id: '2',
    title: 'Real-time Collaboration',
    description: 'Work together seamlessly with your team. See changes as they happen, from anywhere.',
    icon: '👥',
  },
  {
    id: '3',
    title: 'Advanced Security',
    description: 'Enterprise-grade protection for your sensitive data. Peace of mind built right in.',
    icon: '🔒',
  },
  {
    id: '4',
    title: 'Smart Automation',
    description: 'Let AI handle the repetitive tasks so you can focus on what matters most.',
    icon: '⚡',
  },
  {
    id: '5',
    title: 'Detailed Analytics',
    description: 'Gain insights into performance with comprehensive dashboards and reports.',
    icon: '📊',
  },
  {
    id: '6',
    title: 'Cross-platform Support',
    description: 'Access your work from any device. Desktop, tablet, or mobile - we've got you covered.',
    icon: '🔄',
  },
];

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // For 3D effect on feature cards
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  const handleFeatureHover = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    setActiveFeature(id);
    const { xPercent, yPercent } = handleMouseMove(e, 8);
    setRotation({ x: -yPercent, y: xPercent });
  };

  return (
    <section 
      ref={sectionRef}
      id="solutions"
      className="py-24 px-4 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent dark:from-blue-900/5"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 mb-4">
            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Why Choose Us</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Features designed for the modern workflow</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our platform combines powerful functionality with elegant simplicity to enhance your productivity and experience.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={feature.id}
              className={`perspective transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseMove={(e) => handleFeatureHover(e, feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div 
                className={cn(
                  "glass-card h-full rounded-xl p-8 preserve-3d transition-all duration-300",
                  activeFeature === feature.id ? "shadow-xl" : "shadow-md"
                )}
                style={{ 
                  transform: activeFeature === feature.id 
                    ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
                    : 'none'
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Feature icon */}
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-6 text-2xl">
                    {feature.icon}
                  </div>
                  
                  {/* Feature content */}
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
                  
                  {/* Learn more link */}
                  <div className="mt-auto">
                    <a 
                      href="#" 
                      className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                    >
                      Learn more 
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
