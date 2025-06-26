"use client";
import React, { useRef, useEffect } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
};

type Note = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
};

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const notes = useRef<Note[]>([]);
  const pointer = useRef({ x: 0, y: 0 });

  const createStars = (
    count: number,
    width: number,
    height: number
  ) => {
    const newStars: Star[] = [];
    for (let i = 0; i < count; i++) {
      const isSideParticle = i < count * 0.1;
      const directionType = Math.floor(Math.random() * 4);
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
          : Math.random() * 0.4 + 0.03,
        speedX,
        speedY,
        opacity: Math.random(),
      });
    }
    stars.current = newStars;
  };

  const createNotes = (
    count: number,
    width: number,
    height: number
  ) => {
    notes.current = Array.from({ length: count }).map(
      () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 16 + 12,
        opacity: Math.random() * 0.6 + 0.4,
        rotation: Math.random() * 2 * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      })
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const isMobile = width < 768;

      const starCount = isMobile ? 1000 : 2000;
      const noteCount = isMobile ? 20 : 35;

      createStars(starCount, width, height);
      createNotes(noteCount, width, height);
    };

    setCanvasSize();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const musicNoteImg = new Image();
    musicNoteImg.src = "/music-note.png";

    musicNoteImg.onload = () => {
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const isMobile = window.innerWidth < 768;
        const gradientRadius = isMobile
          ? Math.max(canvas.width, canvas.height)
          : Math.max(canvas.width, canvas.height) / 2;

        const nebulaGradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          gradientRadius
        );
        nebulaGradient.addColorStop(
          0,
          isMobile
            ? "rgba(47, 45, 189, 0.3)"
            : "rgba(47, 45, 189, 0.2)"
        );
        nebulaGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = nebulaGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.current.forEach((star) => {
          star.x += star.speedX;
          star.y += star.speedY;
          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;

          star.opacity += (Math.random() - 0.5) * 0.1;
          star.opacity = Math.max(
            0.3,
            Math.min(1, star.opacity)
          );

          ctx.beginPath();
          ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx.fill();
        });

        notes.current.forEach((note) => {
          note.x += note.speedX;
          note.y += note.speedY;
          note.rotation += note.rotationSpeed;

          if (note.x < -50) note.x = canvas.width + 50;
          if (note.x > canvas.width + 50) note.x = -50;
          if (note.y < -50) note.y = canvas.height + 50;
          if (note.y > canvas.height + 50) note.y = -50;

          ctx.save();
          ctx.translate(note.x, note.y);
          ctx.rotate(note.rotation);
          ctx.globalAlpha = note.opacity;
          ctx.drawImage(
            musicNoteImg,
            -note.size / 2,
            -note.size / 2,
            note.size,
            note.size
          );
          ctx.restore();
          ctx.globalAlpha = 1;
        });

        const glowRadius =
          window.innerWidth > 1280 ? 80 : 120;
        const glow = ctx.createRadialGradient(
          pointer.current.x,
          pointer.current.y,
          0,
          pointer.current.x,
          pointer.current.y,
          glowRadius
        );
        glow.addColorStop(0, "rgba(255, 165, 0, 0.2)");
        glow.addColorStop(0.6, "rgba(255, 165, 0, 0.1)");
        glow.addColorStop(0.8, "rgba(255, 165, 0, 0.05)");
        glow.addColorStop(1, "rgba(255, 165, 0, 0)");

        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(
          pointer.current.x,
          pointer.current.y,
          glowRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();

        requestAnimationFrame(animate);
      };

      animate();
    };

    const updatePointer = (e: MouseEvent | TouchEvent) => {
      const clientX =
        e instanceof TouchEvent
          ? e.touches[0]?.clientX
          : e.clientX || 0;
      const clientY =
        e instanceof TouchEvent
          ? e.touches[0]?.clientY
          : e.clientY || 0;
      pointer.current.x = clientX;
      pointer.current.y = clientY;
    };

    window.addEventListener("mousemove", updatePointer);
    window.addEventListener("touchmove", updatePointer);
    window.addEventListener("resize", setCanvasSize);

    return () => {
      window.removeEventListener(
        "mousemove",
        updatePointer
      );
      window.removeEventListener(
        "touchmove",
        updatePointer
      );
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed mix-blend-screen top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
}
