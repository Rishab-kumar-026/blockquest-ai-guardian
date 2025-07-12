
import { useEffect, useRef } from 'react';

export const Interactive3DBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

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
    }

    const shapes: Shape[] = [];
    const colors = ['#2D9CDB', '#9B51E0', '#00F0FF', '#FF6B6B', '#4ECDC4', '#45B7D1'];

    // Create 3D shapes
    for (let i = 0; i < 50; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 30 + 10,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        velocityX: (Math.random() - 0.5) * 0.5,
        velocityY: (Math.random() - 0.5) * 0.5,
        velocityZ: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: ['cube', 'sphere', 'tetrahedron'][Math.floor(Math.random() * 3)] as 'cube' | 'sphere' | 'tetrahedron',
        opacity: Math.random() * 0.8 + 0.2
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
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines between nearby shapes
      ctx.strokeStyle = 'rgba(45, 156, 219, 0.1)';
      ctx.lineWidth = 1;
      
      shapes.forEach((shape, i) => {
        shapes.slice(i + 1).forEach(otherShape => {
          const dx = shape.x - otherShape.x;
          const dy = shape.y - otherShape.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.3;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(shape.x, shape.y);
            ctx.lineTo(otherShape.x, otherShape.y);
            ctx.stroke();
          }
        });
      });

      // Update and draw shapes
      shapes.forEach(shape => {
        // Update position
        shape.x += shape.velocityX;
        shape.y += shape.velocityY;
        shape.z += shape.velocityZ;

        // Mouse interaction
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - shape.x, 2) + 
          Math.pow(mouseRef.current.y - shape.y, 2)
        );
        
        if (mouseDistance < 100) {
          const force = (100 - mouseDistance) / 100;
          shape.velocityX += (shape.x - mouseRef.current.x) * force * 0.001;
          shape.velocityY += (shape.y - mouseRef.current.y) * force * 0.001;
        }

        // Update rotations
        shape.rotationX += 0.01;
        shape.rotationY += 0.01;
        shape.rotationZ += 0.005;

        // Wrap around screen
        if (shape.x < -50) shape.x = canvas.width + 50;
        if (shape.x > canvas.width + 50) shape.x = -50;
        if (shape.y < -50) shape.y = canvas.height + 50;
        if (shape.y > canvas.height + 50) shape.y = -50;
        if (shape.z < 0) shape.z = 1000;
        if (shape.z > 1000) shape.z = 0;

        // Calculate scale based on Z position (perspective)
        const scale = (1000 - shape.z) / 1000;
        const screenX = shape.x;
        const screenY = shape.y;

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
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
