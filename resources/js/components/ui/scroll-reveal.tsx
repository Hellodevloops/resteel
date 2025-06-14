
import { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  origin?: 'bottom' | 'left' | 'right' | 'top';
  distance?: string;
  duration?: number;
  className?: string;
}

const ScrollReveal = ({
  children,
  delay = 0,
  origin = 'bottom',
  distance = '20px',
  duration = 800,
  className = '',
}: ScrollRevealProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  const getTransformValue = () => {
    switch (origin) {
      case 'bottom':
        return `translateY(${distance})`;
      case 'top':
        return `translateY(-${distance})`;
      case 'left':
        return `translateX(-${distance})`;
      case 'right':
        return `translateX(${distance})`;
      default:
        return `translateY(${distance})`;
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`animate-on-scroll ${className}`}
      style={{
        transform: getTransformValue(),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
