import React, { useRef, useEffect } from 'react';
import Phone from './components/Phone';

const App: React.FC = () => {
  const phoneContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        if (!phoneContainerRef.current) return;

        const { innerWidth: width, innerHeight: height } = window;
        const { clientX: x, clientY: y } = e;

        const rotateY = (x - width / 2) / (width / 2) * 10;
        const rotateX = -(y - height / 2) / (height / 2) * 10;

        phoneContainerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div style={{ perspective: '1000px' }}>
      <div
        ref={phoneContainerRef}
        style={{
          transition: 'transform 0.4s ease-out',
        }}
      >
        <Phone />
      </div>
    </div>
  );
};

export default App;
