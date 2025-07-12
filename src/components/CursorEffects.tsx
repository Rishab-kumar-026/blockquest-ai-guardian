
import { useEffect, useState } from 'react';

export const CursorEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <div
        className="fixed pointer-events-none z-50 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30 blur-sm transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: isClicking ? 'scale(1.5)' : 'scale(1)',
        }}
      />
      
      {/* Cursor trail */}
      <div
        className="fixed pointer-events-none z-40 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500/50 to-purple-500/50 transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: isClicking ? 'scale(2)' : 'scale(1)',
        }}
      />

      {/* Outer glow ring */}
      <div
        className="fixed pointer-events-none z-30 w-16 h-16 rounded-full border border-cyan-400/20 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 32,
          top: mousePosition.y - 32,
          transform: isClicking ? 'scale(1.8) rotate(180deg)' : 'scale(1) rotate(0deg)',
        }}
      />
    </>
  );
};
