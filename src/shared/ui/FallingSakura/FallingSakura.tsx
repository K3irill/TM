import { useEffect, useRef } from 'react';

const FallingSakura: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // More petals, but keep it adaptive to screen size to avoid FPS drops
    const area = (window.innerWidth * window.innerHeight) / (1920 * 1080);
    const numberOfPetals = Math.max(18, Math.min(60, Math.round(32 * area)));
    const petals: { x: number; y: number; size: number; color: string; speedX: number; speedY: number; rotation: number; wobble: number; wobbleSpeed: number }[] = [];

    // Function to generate a random number within a range
    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    // Define leaf colors (Sakura-like colors)
    const petalColors = ['#FDE8E9', '#F9D7DA', '#F5C6CB', '#F2B5BC'];

    for (let i = 0; i < numberOfPetals; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: random(8, 16),
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        speedX: random(-0.3, 0.3), // Even slower horizontal speed
        speedY: random(0.5, 0.9), // Adjusted vertical speed
        rotation: random(0, Math.PI * 2),
        wobble: random(0, Math.PI * 2), // Initial wobble position
        wobbleSpeed: random(0.02, 0.05), // Wobble speed
      });
    }

    // Function to draw a single sakura petal (not heart-shaped)
    const drawPetal = (petal: { x: number; y: number; size: number; color: string; speedX: number; speedY: number; rotation: number; wobble: number; wobbleSpeed: number }) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);

      // Sakura petal: pointed tip + slight notch at the base
      const s = petal.size;
      ctx.beginPath();
      // base notch
      ctx.moveTo(0, 0);
      // left base curve
      ctx.bezierCurveTo(-0.35 * s, 0.05 * s, -0.6 * s, -0.25 * s, -0.55 * s, -0.55 * s);
      // left shoulder to tip
      ctx.bezierCurveTo(-0.5 * s, -0.95 * s, -0.2 * s, -1.25 * s, 0, -1.32 * s);
      // right shoulder from tip
      ctx.bezierCurveTo(0.2 * s, -1.25 * s, 0.5 * s, -0.95 * s, 0.55 * s, -0.55 * s);
      // right base curve back to notch
      ctx.bezierCurveTo(0.6 * s, -0.25 * s, 0.35 * s, 0.05 * s, 0, 0);
      ctx.closePath();

      ctx.fillStyle = petal.color;
      ctx.fill();

      // subtle highlight vein
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = Math.max(0.8, s * 0.06);
      ctx.beginPath();
      ctx.moveTo(0, -0.15 * s);
      ctx.quadraticCurveTo(0.05 * s, -0.6 * s, 0, -1.15 * s);
      ctx.stroke();

      ctx.restore();
    };

    // Function to update a single petal's position and wobble
    const updatePetal = (petal: { x: number; y: number; size: number; color: string; speedX: number; speedY: number; rotation: number; wobble: number; wobbleSpeed: number }) => {
      petal.x += petal.speedX + Math.sin(petal.wobble) * 0.2; // Add a subtle wobble
      petal.y += petal.speedY;
      petal.rotation += 0.01;
      petal.wobble += petal.wobbleSpeed; // Update wobble position

      // If a petal goes out of the screen, wrap it back
      if (petal.x < -petal.size) petal.x = width + petal.size;
      if (petal.x > width + petal.size) petal.x = -petal.size;
      if (petal.y > height + petal.size) petal.y = -petal.size;
    };

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(petal => {
        drawPetal(petal);
        updatePetal(petal);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default FallingSakura;
