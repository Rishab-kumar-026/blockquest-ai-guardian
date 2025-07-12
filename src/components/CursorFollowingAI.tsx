
import { useEffect, useState } from 'react';
import { Bot } from 'lucide-react';

export const CursorFollowingAI = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [aiPosition, setAiPosition] = useState({ x: 100, y: 100 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  useEffect(() => {
    const followMouse = () => {
      const dx = mousePosition.x - aiPosition.x;
      const dy = mousePosition.y - aiPosition.y;
      
      // Calculate angle for rotation
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setRotation(angle);
      
      // Smooth following with some delay
      setAiPosition(prev => ({
        x: prev.x + dx * 0.1,
        y: prev.y + dy * 0.1
      }));
    };

    const interval = setInterval(followMouse, 16); // ~60fps
    return () => clearInterval(interval);
  }, [mousePosition, aiPosition]);

  return (
    <div
      className="fixed pointer-events-none z-40 transition-all duration-100 ease-out"
      style={{
        left: aiPosition.x - 32,
        top: aiPosition.y - 32,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* AI Avatar with Glow Effect */}
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full blur-md animate-pulse" />
        
        {/* Main AI Avatar */}
        <div className="relative w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25 border-2 border-white/20">
          <Bot className="w-8 h-8 text-white" />
          
          {/* Animated pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-ping" />
        </div>
        
        {/* Eye tracking effect */}
        <div 
          className="absolute top-4 left-6 w-2 h-2 bg-white rounded-full transition-all duration-150"
          style={{
            transform: `translate(${Math.cos(rotation * Math.PI / 180) * 2}px, ${Math.sin(rotation * Math.PI / 180) * 2}px)`
          }}
        />
        <div 
          className="absolute top-4 right-6 w-2 h-2 bg-white rounded-full transition-all duration-150"
          style={{
            transform: `translate(${Math.cos(rotation * Math.PI / 180) * 2}px, ${Math.sin(rotation * Math.PI / 180) * 2}px)`
          }}
        />
        
        {/* Particle trail */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/40 rounded-full animate-ping"
              style={{
                left: '50%',
                top: '50%',
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
