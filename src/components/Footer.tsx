
import { useState, useEffect } from 'react';

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset submitted state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Footer top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company info */}
          <div className="space-y-4">
            <a href="/" className="text-xl font-medium tracking-tight inline-block">
              <span className="text-gradient font-bold">Innovate</span>
            </a>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Transforming digital experiences with intuitive design and powerful technology.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons */}
              {[1, 2, 3, 4].map((i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary transition-colors"
                >
                  {/* Social icons would go here */}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links columns */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Integrations', 'Pricing', 'Changelog', 'Documentation'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact', 'Media Kit'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay updated</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and news.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-all ${
                  isSubmitted 
                    ? 'bg-green-500' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isSubmitting 
                  ? 'Subscribing...' 
                  : isSubmitted 
                    ? 'Subscribed!' 
                    : 'Subscribe'
                }
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {year} Innovate, Inc. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Terms', 'Privacy', 'Cookies', 'Contact'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
