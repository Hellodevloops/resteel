
import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Reveal when element is 10% into the viewport
        if (elementPosition < windowHeight * 0.9) {
          element.classList.add('visible');
        }
      });
    };
    
    // Initial check for elements in view on load
    setTimeout(animateElements, 100);
    
    // Throttle scroll event for better performance
    let scrollThrottleTimeout: number;
    const throttledScroll = () => {
      if (!scrollThrottleTimeout) {
        scrollThrottleTimeout = window.setTimeout(() => {
          scrollThrottleTimeout = 0;
          animateElements();
        }, 100);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', throttledScroll);
    window.addEventListener('resize', throttledScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledScroll);
      window.clearTimeout(scrollThrottleTimeout);
    };
  }, []);
}

export default useScrollAnimation;
