import React, { useEffect, useRef } from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '../ui/Button';

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation for the background grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Grid properties
    const gridSize = 30;
    const dotSize = 1;
    let frame = 0;

    // Animation loop
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      
      // Draw grid points
      ctx.fillStyle = 'rgba(49, 225, 247, 0.3)';
      
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          // Calculate a wave effect
          const distanceToCenter = Math.sqrt(
            Math.pow(x - width / 2, 2) + Math.pow(y - height / 2, 2)
          );
          
          const waveOffset = Math.sin(distanceToCenter / 50 - frame / 30) * 3;
          
          ctx.beginPath();
          ctx.arc(x + waveOffset, y + waveOffset, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/95 z-10"></div>
      
      {/* Content */}
      <div className="container px-4 sm:px-6 mx-auto relative z-20 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-1 px-3 mb-6 border border-cyan-400/30 rounded-full bg-gray-800/50 backdrop-blur-sm text-cyan-400 text-sm">
            <Shield className="w-4 h-4 mr-2" />
            <span>Your Security is Our Priority</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              Protect Your Digital Identity
            </span>
            <br />
            <span className="text-white">From Data Breaches</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Check if your sensitive info has been compromised in data breaches and get real-time alerts for future leaks.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              variant="primary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => {
                document.querySelector('#search')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Check for Breaches
            </Button>
            
            <Button 
              size="lg" 
              variant="secondary"
            >
              Learn More
            </Button>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-4">Trusted by security professionals worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              {/* Placeholder for company logos */}
              <div className="h-8 w-24 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-8 w-28 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-8 w-20 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-gray-800 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;