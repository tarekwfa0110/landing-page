
import { useEffect, useRef, useState } from 'react';
import { handleMouseMove } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMoveEffect = (e: React.MouseEvent<HTMLDivElement>) => {
    const { xPercent, yPercent } = handleMouseMove(e, 20);
    setRotation({ x: -yPercent, y: xPercent });
  };

  return (
    <div 
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden"
      onMouseMove={handleMouseMoveEffect}
    >
      {/* Background gradient layers */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white opacity-80 dark:from-gray-900 dark:to-gray-950"></div>
      <div className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-blue-100/50 dark:bg-blue-900/10 blur-3xl"></div>
      <div className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-indigo-100/50 dark:bg-indigo-900/10 blur-3xl"></div>
      
      {/* Content container */}
      <div className="max-w-7xl w-full mx-auto relative z-10 space-y-20">
        {/* Hero content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          {/* Text content */}
          <motion.div 
            className="w-full md:w-1/2 space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Introducing the future</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Elevate your digital <span className="text-gradient">experience</span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 md:pr-10 leading-relaxed text-balance">
              Discover the perfect blend of innovation and simplicity with our cutting-edge platform. 
              Designed to transform how you interact with technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="px-8 py-6 bg-primary text-white rounded-full font-medium hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5">
                <Link to="/pricing">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 bg-white dark:bg-gray-800 rounded-full font-medium border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300">
                <Link to="/showcase">View Showcase</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-3 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"></div>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">2,500+</span> satisfied customers
              </div>
            </div>
          </motion.div>
          
          {/* 3D Animation */}
          <motion.div 
            className="w-full md:w-1/2 h-[400px] md:h-[500px] perspective"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div 
              className="w-full h-full preserve-3d transition-transform duration-200 ease-out"
              style={{ 
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
              }}
            >
              {/* Main floating shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] backface-hidden animate-float">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl shadow-2xl animate-morph"></div>
                
                {/* Floating elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-pink-400 rounded-full shadow-lg animate-float" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-yellow-400 rounded-full shadow-lg animate-float" style={{ animationDelay: '0.8s' }}></div>
                <div className="absolute top-1/4 -left-16 w-16 h-16 bg-emerald-400 rounded-xl shadow-lg animate-float" style={{ animationDelay: '1.2s' }}></div>
                <div className="absolute bottom-1/4 -right-12 w-16 h-16 bg-violet-400 rounded-xl shadow-lg animate-float" style={{ animationDelay: '2s' }}></div>
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-blue-500 animate-pulse-soft"></div>
                  </div>
                </div>
                
                {/* Connecting lines using pseudo border elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="w-full h-full">
                    {/* Add pseudo connecting lines here */}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Logos section */}
        <motion.div 
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8">
            Trusted by innovative companies worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-7 w-24 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse-soft" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
}
