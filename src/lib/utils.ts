
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to handle mouse parallax effect
export function handleMouseMove(e: React.MouseEvent<HTMLElement>, intensity = 0.05) {
  const { currentTarget } = e;
  const rect = currentTarget.getBoundingClientRect();
  
  // Calculate mouse position relative to the element
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Convert to percentage (-0.5 to 0.5)
  const xPercent = (x / rect.width - 0.5) * intensity;
  const yPercent = (y / rect.height - 0.5) * intensity;
  
  return { xPercent, yPercent };
}

// Format large numbers with K, M suffixes
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Intersection Observer hook helper
export function onIntersect(element: Element, callback: () => void, options = { threshold: 0.1 }) {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      callback();
      observer.disconnect();
    }
  }, options);
  
  if (element) {
    observer.observe(element);
  }
  
  return () => observer.disconnect();
}

// Generate random data for demo purposes
export function generateRandomData(count: number, min: number, max: number) {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

// Calculate percent change between two numbers
export function calculatePercentChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Number(((current - previous) / previous * 100).toFixed(1));
}
