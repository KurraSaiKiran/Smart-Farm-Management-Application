import React, { useEffect, useRef, useState } from 'react';

const CursorFollower: React.FC = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();

    if (isMobile) return;

    // Initialize position
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    followerPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Check if cursor is over interactive elements
      const target = e.target as HTMLElement;
      const isOverInteractive = target.closest('button, input, textarea, select, a, [role="button"], .upload-card');
      setIsVisible(!isOverInteractive);
    };

    // Smooth animation loop
    const animate = () => {
      if (!followerRef.current) return;

      // Smooth easing - lag behind cursor
      const ease = 0.15;
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;

      followerRef.current.style.left = `${followerPos.current.x - 20}px`;
      followerRef.current.style.top = `${followerPos.current.y - 20}px`;
      
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={followerRef}
      className={`cursor-follower ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

export default CursorFollower;