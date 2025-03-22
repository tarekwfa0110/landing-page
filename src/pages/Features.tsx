
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

const Features = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-800 opacity-25"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading features...</p>
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
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful <span className="text-gradient">Features</span> That Make a Difference
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover the tools and capabilities that set our platform apart and help you achieve more.
            </p>
          </div>
        </div>
        <FeaturesSection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Features;
