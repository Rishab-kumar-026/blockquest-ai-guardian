import { useEffect, useRef } from 'react';

export const Interactive3DBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const interactionRef = useRef({ 
    isClicking: false, 
    clickIntensity: 0,
    hoverIntensity: 0,
    scrollVelocity: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Shape {
      x: number;
      y: number;
      z: number;
      size: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      velocityX: number;
      velocityY: number;
      velocityZ: number;
      color: string;
      type: 'cube' | 'sphere' | 'tetrahedron';
      opacity: number;
      baseSize: number;
      pulsePhase: number;
    }

    const shapes: Shape[] = [];
    const colors = ['#2D9CDB', '#9B51E0', '#00F0FF', '#FF6B6B', '#4ECDC4', '#45B7D1'];

    // Create 3D shapes
    for (let i = 0; i < 50; i++) {
      const baseSize = Math.random() * 30 + 10;
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: baseSize,
        baseSize: baseSize,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        velocityX: (Math.random() - 0.5) * 0.5,
        velocityY: (Math.random() - 0.5) * 0.5,
        velocityZ: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: ['cube', 'sphere', 'tetrahedron'][Math.floor(Math.random() * 3)] as 'cube' | 'sphere' | 'tetrahedron',
        opacity: Math.random() * 0.8 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    const drawCube = (shape: Shape, screenX: number, screenY: number, scale: number) => {
      const size = shape.size * scale;
      
      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.rotate(shape.rotationZ);
      
      // Draw cube with 3D effect
      ctx.fillStyle = shape.color;
      ctx.globalAlpha = shape.opacity * scale;
      
      // Front face
      ctx.fillRect(-size/2, -size/2, size, size);
      
      // Right face (darker)
      ctx.fillStyle = adjustBrightness(shape.color, -30);
      ctx.beginPath();
      ctx.moveTo(size/2, -size/2);
      ctx.lineTo(size/2 + size/4, -size/2 - size/4);
      ctx.lineTo(size/2 + size/4, size/2 - size/4);
      ctx.lineTo(size/2, size/2);
      ctx.closePath();
      ctx.fill();
      
      // Top face (lighter)
      ctx.fillStyle = adjustBrightness(shape.color, 30);
      ctx.beginPath();
      ctx.moveTo(-size/2, -size/2);
      ctx.lineTo(-size/2 + size/4, -size/2 - size/4);
      ctx.lineTo(size/2 + size/4, -size/2 - size/4);
      ctx.lineTo(size/2, -size/2);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    const drawSphere = (shape: Shape, screenX: number, screenY: number, scale: number) => {
      const radius = shape.size * scale / 2;
      
      ctx.save();
      ctx.globalAlpha = shape.opacity * scale;
      
      // Create gradient for 3D effect
      const gradient = ctx.createRadialGradient(
        screenX - radius/3, screenY - radius/3, 0,
        screenX, screenY, radius
      );
      gradient.addColorStop(0, adjustBrightness(shape.color, 50));
      gradient.addColorStop(1, adjustBrightness(shape.color, -50));
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawTetrahedron = (shape: Shape, screenX: number, screenY: number, scale: number) => {
      const size = shape.size * scale;
      
      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.rotate(shape.rotationZ);
      ctx.globalAlpha = shape.opacity * scale;
      
      ctx.fillStyle = shape.color;
      ctx.beginPath();
      ctx.moveTo(0, -size/2);
      ctx.lineTo(-size/2, size/2);
      ctx.lineTo(size/2, size/2);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    const adjustBrightness = (color: string, amount: number) => {
      const hex = color.replace('#', '');
      const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
      const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
      const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
      return `rgb(${r}, ${g}, ${b})`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
      
      // Increase hover intensity
      interactionRef.current.hoverIntensity = Math.min(1, interactionRef.current.hoverIntensity + 0.1);
    };

    const handleMouseDown = () => {
      interactionRef.current.isClicking = true;
      interactionRef.current.clickIntensity = 1;
    };

    const handleMouseUp = () => {
      interactionRef.current.isClicking = false;
    };

    const handleScroll = (e: WheelEvent) => {
      interactionRef.current.scrollVelocity = Math.abs(e.deltaY) * 0.01;
    };

    const handleClick = (e: MouseEvent) => {
      // Create ripple effect from click position
      const clickRipple = {
        x: e.clientX,
        y: e.clientY,
        intensity: 1,
        radius: 0
      };
      
      // Apply immediate effect to nearby shapes
      shapes.forEach(shape => {
        const distance = Math.sqrt(
          Math.pow(e.clientX - shape.x, 2) + 
          Math.pow(e.clientY - shape.y, 2)
        );
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          shape.velocityX += (shape.x - e.clientX) * force * 0.02;
          shape.velocityY += (shape.y - e.clientY) * force * 0.02;
          shape.rotationZ += force * 0.5;
          shape.size = shape.baseSize * (1 + force * 0.5);
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradually reduce interaction intensities
      interactionRef.current.clickIntensity *= 0.95;
      interactionRef.current.hoverIntensity *= 0.98;
      interactionRef.current.scrollVelocity *= 0.9;

      // Draw enhanced connection lines with interaction effects
      const lineOpacity = 0.1 + (interactionRef.current.hoverIntensity * 0.2) + (interactionRef.current.clickIntensity * 0.3);
      ctx.strokeStyle = `rgba(45, 156, 219, ${lineOpacity})`;
      ctx.lineWidth = 1 + (interactionRef.current.clickIntensity * 2);
      
      shapes.forEach((shape, i) => {
        shapes.slice(i + 1).forEach(otherShape => {
          const dx = shape.x - otherShape.x;
          const dy = shape.y - otherShape.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const connectionDistance = 150 + (interactionRef.current.hoverIntensity * 50);
          
          if (distance < connectionDistance) {
            const opacity = (connectionDistance - distance) / connectionDistance * lineOpacity;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(shape.x, shape.y);
            ctx.lineTo(otherShape.x, otherShape.y);
            ctx.stroke();
          }
        });
      });

      // Update and draw shapes with interaction effects
      shapes.forEach(shape => {
        // Update pulse phase
        shape.pulsePhase += 0.02 + (interactionRef.current.scrollVelocity * 0.1);
        
        // Apply pulsing effect based on interactions
        const pulseEffect = 1 + Math.sin(shape.pulsePhase) * 0.1 * (interactionRef.current.hoverIntensity + interactionRef.current.clickIntensity);
        shape.size = shape.baseSize * pulseEffect;

        // Enhanced mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - shape.x, 2) + 
          Math.pow(mouseRef.current.y - shape.y, 2)
        );
        
        const interactionRadius = 100 + (interactionRef.current.clickIntensity * 100);
        
        if (mouseDistance < interactionRadius) {
          const force = (interactionRadius - mouseDistance) / interactionRadius;
          const multiplier = 0.001 + (interactionRef.current.clickIntensity * 0.01);
          
          shape.velocityX += (shape.x - mouseRef.current.x) * force * multiplier;
          shape.velocityY += (shape.y - mouseRef.current.y) * force * multiplier;
          
          // Enhanced rotation during interaction
          shape.rotationZ += force * 0.02 * (1 + interactionRef.current.clickIntensity * 2);
        }

        // Update position with interaction effects
        const velocityMultiplier = 1 + (interactionRef.current.scrollVelocity * 0.5);
        shape.x += shape.velocityX * velocityMultiplier;
        shape.y += shape.velocityY * velocityMultiplier;
        shape.z += shape.velocityZ * velocityMultiplier;

        // Enhanced rotations with interaction
        const rotationSpeed = 0.01 + (interactionRef.current.hoverIntensity * 0.02) + (interactionRef.current.clickIntensity * 0.05);
        shape.rotationX += rotationSpeed;
        shape.rotationY += rotationSpeed;
        shape.rotationZ += rotationSpeed * 0.5;

        // Wrap around screen
        if (shape.x < -50) shape.x = canvas.width + 50;
        if (shape.x > canvas.width + 50) shape.x = -50;
        if (shape.y < -50) shape.y = canvas.height + 50;
        if (shape.y > canvas.height + 50) shape.y = -50;
        if (shape.z < 0) shape.z = 1000;
        if (shape.z > 1000) shape.z = 0;

        // Apply friction
        shape.velocityX *= 0.99;
        shape.velocityY *= 0.99;

        // Calculate scale with interaction enhancement
        const baseScale = (1000 - shape.z) / 1000;
        const interactionScale = 1 + (interactionRef.current.clickIntensity * 0.3) + (interactionRef.current.hoverIntensity * 0.1);
        const scale = baseScale * interactionScale;
        
        const screenX = shape.x;
        const screenY = shape.y;

        // Enhanced opacity with interactions
        const baseOpacity = shape.opacity;
        const interactionOpacity = Math.min(1, baseOpacity + (interactionRef.current.hoverIntensity * 0.3) + (interactionRef.current.clickIntensity * 0.5));
        shape.opacity = interactionOpacity;

        // Draw shape based on type
        switch (shape.type) {
          case 'cube':
            drawCube(shape, screenX, screenY, scale);
            break;
          case 'sphere':
            drawSphere(shape, screenX, screenY, scale);
            break;
          case 'tetrahedron':
            drawTetrahedron(shape, screenX, screenY, scale);
            break;
        }
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('click', handleClick);
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
