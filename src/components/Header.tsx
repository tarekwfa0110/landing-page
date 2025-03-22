
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        scrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-xl font-medium tracking-tight">
            <span className="text-gradient font-bold">Innovate</span>
          </a>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          {['Features', 'Solutions', 'Pricing', 'About'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="hidden md:block text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 text-gray-700 hover:text-black">
            Sign In
          </button>
          <button className="text-sm font-medium bg-primary text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 transform hover:-translate-y-0.5">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
