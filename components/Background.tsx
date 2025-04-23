"use client";
import React, { useRef, useEffect } from "react";

// Define star type
type Star = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
};

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const pointer = useRef({ x: 0, y: 0 });

  const createStars = (count: number, width: number, height: number) => {
    const newStars: Star[] = [];
    for (let i = 0; i < count; i++) {
      const isSideParticle = i < count * 0.1; // Reduced to 5% directional particles
      const directionType = Math.floor(Math.random() * 4); // 0=left, 1=right, 2=up, 3=down
      let speedX = 0;
      let speedY = 0;

      if (isSideParticle) {
        switch (directionType) {
          case 0:
            speedX = -(Math.random() * 0.6 + 0.2);
            break;
          case 1:
            speedX = Math.random() * 0.6 + 0.2;
            break;
          case 2:
            speedY = -(Math.random() * 0.6 + 0.2);
            break;
          case 3:
            speedY = Math.random() * 0.6 + 0.2;
            break;
        }
      } else {
        speedX = (Math.random() - 0.5) * 0.8;
        speedY = (Math.random() - 0.5) * 0.8;
      }

      newStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isSideParticle
          ? Math.random() * 1.2 + 0.5
          : Math.random() * 0.4 + 0.03, // Smaller directional particles
        speedX,
        speedY,
        opacity: Math.random(),
      });
    }
    stars.current = newStars;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createStars(1000, canvas.width, canvas.height);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Soft nebula background glow
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      nebulaGradient.addColorStop(0, "rgba(128, 0, 128, 0.08)");
      nebulaGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.current.forEach((star) => {
        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkle effect
        star.opacity += (Math.random() - 0.5) * 0.1;
        star.opacity = Math.max(0.3, Math.min(1, star.opacity));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      // Draw cursor glow effect - dimmed
      const grad = ctx.createRadialGradient(
        pointer.current.x,
        pointer.current.y,
        0,
        pointer.current.x,
        pointer.current.y,
        80
      );
      grad.addColorStop(0, "rgba(255, 140, 0, 0.4)");
      grad.addColorStop(1, "rgba(255, 140, 0, 0)");

      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(pointer.current.x, pointer.current.y, 80, 0, Math.PI * 2);
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();

    const updatePointer = (e: MouseEvent) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
    };

    window.addEventListener("mousemove", updatePointer);
    return () => window.removeEventListener("mousemove", updatePointer);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1]"
    />
  );
}
