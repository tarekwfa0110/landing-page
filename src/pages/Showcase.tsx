
import { useEffect, useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';

// Simulated API call to fetch showcase data
const fetchShowcaseData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: '1',
      title: 'Global Analytics Dashboard',
      description: 'Real-time data visualization for enterprise metrics tracking across multiple regions.',
      image: 'https://placehold.co/1200x800/2563eb/ffffff?text=Dashboard',
      tags: ['Analytics', 'Enterprise', 'Real-time'],
    },
    {
      id: '2',
      title: 'Collaboration Workspace',
      description: 'Seamless team communication and project management for distributed teams.',
      image: 'https://placehold.co/1200x800/4f46e5/ffffff?text=Workspace',
      tags: ['Collaboration', 'Teams', 'Project Management'],
    },
    {
      id: '3',
      title: 'AI-Powered Recommendations',
      description: 'Smart suggestions that learn from user behavior to improve productivity.',
      image: 'https://placehold.co/1200x800/7c3aed/ffffff?text=AI+Features',
      tags: ['AI', 'Machine Learning', 'Productivity'],
    },
    {
      id: '4',
      title: 'Secure Document Management',
      description: 'End-to-end encrypted storage and sharing for sensitive information.',
      image: 'https://placehold.co/1200x800/0ea5e9/ffffff?text=Security',
      tags: ['Security', 'Compliance', 'Document Management'],
    },
    {
      id: '5',
      title: 'Integrated Workflow Automation',
      description: 'Automate repetitive tasks and connect your favorite tools effortlessly.',
      image: 'https://placehold.co/1200x800/10b981/ffffff?text=Automation',
      tags: ['Automation', 'Integration', 'Workflow'],
    },
  ];
};

const ShowcaseItem = ({ item, index }: { item: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={ref}
      className="flex flex-col md:flex-row items-center gap-12 py-20"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
        <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags.map((tag: string) => (
                  <span key={tag} className="text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full px-2.5 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
        <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {item.description}
        </p>
        <Button>Learn More</Button>
      </div>
    </motion.div>
  );
};

const Showcase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: showcaseItems = [], isLoading: isDataLoading } = useQuery({
    queryKey: ['showcaseData'],
    queryFn: fetchShowcaseData
  });
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isDataLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800 opacity-25"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading showcase...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="flex-grow">
        {/* Hero section */}
        <div ref={containerRef} className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
            style={{ 
              backgroundImage: 'url(https://placehold.co/1920x1080/2053b8/ffffff?text=Showcase)',
              y: backgroundY
            }}
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative z-20 max-w-7xl mx-auto px-4 text-white text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our <span className="text-blue-300">Showcase</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore our latest projects and see how our platform transforms businesses
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button className="bg-white text-blue-900 hover:bg-gray-100 mr-4">
                View All Projects
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Request a Demo
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Carousel section */}
        <div className="py-20 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Swipe through our most impressive implementations
              </p>
            </div>
            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {showcaseItems.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full aspect-video object-cover"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className="position-override mr-4" />
                <CarouselNext className="position-override" />
              </div>
            </Carousel>
          </div>
        </div>

        {/* Detailed showcase items */}
        <div className="max-w-7xl mx-auto px-4 py-20 divide-y divide-gray-200 dark:divide-gray-800">
          {showcaseItems.map((item, index) => (
            <ShowcaseItem key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* CTA section */}
        <div className="bg-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90">
              Join thousands of companies already using our platform to drive growth and innovation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-primary hover:bg-gray-100">
                Get Started
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Showcase;
