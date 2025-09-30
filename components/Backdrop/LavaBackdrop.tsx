"use client";

import { useEffect, useRef, useState } from "react";

type BlobConfig = {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  velocityX: number;
  velocityY: number;
  scalePhase: number;
  scaleSpeed: number;
  alpha: number;
  color: string;
  depth: number;
};

type DrawContext = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  buffer: HTMLCanvasElement;
  bufferCtx: CanvasRenderingContext2D;
  blobs: BlobConfig[];
  parallax: number;
  lastTime: number;
  lastFrame: number;
  dpr: number;
  reduceMotion: boolean;
};

const MAX_PARALLAX_SHIFT = 12;
const FRAME_INTERVAL = 1000 / 30;

function hexToRgba(hex: string, alpha: number) {
  const sanitized = hex.replace("#", "");
  const value = sanitized.length === 3
    ? sanitized
        .split("")
        .map((char) => char + char)
        .join("")
    : sanitized;
  const bigint = parseInt(value, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function createBlobs(colors: string[], width: number, height: number): BlobConfig[] {
  const blobs: BlobConfig[] = [];
  const warmColors = colors.slice(0, 3);
  const coolColors = colors.slice(3);

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const addBlob = (color: string, index: number, total: number, alphaRange: [number, number]) => {
    const depth = 0.5 + (index / total) * 0.8;
    const radiusBase = Math.max(width, height) * randomInRange(0.22, 0.34);
    const alpha = randomInRange(alphaRange[0], alphaRange[1]);
    blobs.push({
      x: randomInRange(0.2, 0.8) * width,
      y: randomInRange(0.1, 0.9) * height,
      radius: radiusBase,
      baseRadius: radiusBase,
      velocityX: randomInRange(-0.035, 0.035),
      velocityY: randomInRange(-0.02, 0.02),
      scalePhase: randomInRange(0, Math.PI * 2),
      scaleSpeed: randomInRange(0.00008, 0.00012),
      alpha,
      color,
      depth,
    });
  };

  warmColors.slice(0, 2).forEach((color, index) => {
    addBlob(color, index, warmColors.length, [0.08, 0.12]);
  });

  coolColors.forEach((color, index) => {
    addBlob(color, index + 2, coolColors.length + 2, [0.06, 0.1]);
  });

  return blobs;
}

function resizeContext(context: DrawContext) {
  const { canvas, buffer } = context;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = (context.dpr = Math.min(window.devicePixelRatio || 1, 2));
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const bufferCtx = context.bufferCtx;
  const ctx = context.ctx;
  buffer.width = width * dpr;
  buffer.height = height * dpr;
  bufferCtx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  bufferCtx.scale(dpr, dpr);
  ctx.scale(dpr, dpr);
  context.blobs = createBlobs(context.blobs.map((blob) => blob.color), width, height);
}

function drawFrame(context: DrawContext, time: number) {
  const { bufferCtx, ctx, buffer, canvas, blobs, parallax, reduceMotion } = context;
  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;

  bufferCtx.clearRect(0, 0, width, height);

  const rootStyle = getComputedStyle(document.documentElement);
  const mistColor = rootStyle.getPropertyValue("--muted").trim();
  const textColor = rootStyle.getPropertyValue("--text").trim();

  const verticalGradient = bufferCtx.createLinearGradient(0, 0, 0, height);
  verticalGradient.addColorStop(0, hexToRgba(textColor, 0.04));
  verticalGradient.addColorStop(1, hexToRgba(mistColor, 0.08));
  bufferCtx.fillStyle = verticalGradient;
  bufferCtx.fillRect(0, 0, width, height);

  blobs.forEach((blob) => {
    const gradient = bufferCtx.createRadialGradient(blob.x, blob.y, blob.radius * 0.2, blob.x, blob.y, blob.radius);
    gradient.addColorStop(0, hexToRgba(blob.color, blob.alpha));
    gradient.addColorStop(1, hexToRgba(blob.color, 0));
    bufferCtx.fillStyle = gradient;
    bufferCtx.globalCompositeOperation = "lighter";
    bufferCtx.beginPath();
    bufferCtx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
    bufferCtx.fill();
  });

  bufferCtx.globalCompositeOperation = "source-over";

  ctx.clearRect(0, 0, width, height);
  const blurStrength = Math.max(width, height) * 0.04;
  ctx.filter = `blur(${Math.round(blurStrength)}px)`;
  ctx.drawImage(buffer, 0, 0, width, height);
  ctx.filter = "none";

  if (reduceMotion) {
    return;
  }

  const now = time;
  const delta = now - context.lastTime;
  context.lastTime = now;

  if (now - context.lastFrame < FRAME_INTERVAL) {
    return;
  }
  context.lastFrame = now;

  blobs.forEach((blob) => {
    const scale = 1 + Math.sin(blob.scalePhase + now * blob.scaleSpeed) * 0.08;
    blob.radius = blob.baseRadius * scale;
    blob.x += blob.velocityX * delta * (0.05 + blob.depth * 0.4);
    blob.y += blob.velocityY * delta * (0.05 + blob.depth * 0.3);

    const parallaxOffset = parallax * blob.depth;
    blob.y += parallaxOffset * 0.02;

    if (blob.x - blob.radius > width + 120) blob.x = -blob.radius;
    if (blob.x + blob.radius < -120) blob.x = width + blob.radius;
    if (blob.y - blob.radius > height + 120) blob.y = -blob.radius;
    if (blob.y + blob.radius < -120) blob.y = height + blob.radius;
  });
}

export default function LavaBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<DrawContext | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const existing = Array.from(document.querySelectorAll<HTMLCanvasElement>(".site-backdrop"));
    if (existing.length > 0) {
      const primary = existing[0];
      if (canvas !== primary) {
        setEnabled(false);
        return;
      }
      existing.slice(1).forEach((node) => node.remove());
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const buffer = document.createElement("canvas");
    const bufferCtx = buffer.getContext("2d");
    if (!bufferCtx) {
      return;
    }

    const rootStyle = getComputedStyle(document.documentElement);
    const colors = [
      rootStyle.getPropertyValue("--primary-300").trim(),
      rootStyle.getPropertyValue("--primary-400").trim(),
      rootStyle.getPropertyValue("--neutral-50").trim(),
      rootStyle.getPropertyValue("--muted").trim(),
      rootStyle.getPropertyValue("--neutral-100").trim(),
      rootStyle.getPropertyValue("--neutral-200").trim(),
    ];

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = reduceMotionQuery.matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const drawContext: DrawContext = {
      canvas,
      ctx,
      buffer,
      bufferCtx,
      blobs: createBlobs(colors, window.innerWidth, window.innerHeight),
      parallax: 0,
      lastTime: performance.now(),
      lastFrame: 0,
      dpr,
      reduceMotion,
    };

    contextRef.current = drawContext;

    const handleResize = () => {
      resizeContext(drawContext);
    };

    let scheduledParallax = false;
    let latestScrollY = window.scrollY;

    const updateParallax = () => {
      const scrollRatio = Math.min(latestScrollY / Math.max(window.innerHeight, 1), 1);
      drawContext.parallax = (scrollRatio * 2 - 1) * MAX_PARALLAX_SHIFT;
      scheduledParallax = false;
    };

    const handleScroll = () => {
      latestScrollY = window.scrollY;
      if (!scheduledParallax) {
        scheduledParallax = true;
        requestAnimationFrame(updateParallax);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        drawContext.lastTime = performance.now();
      }
    };

    const handleMotionChange = () => {
      drawContext.reduceMotion = reduceMotionQuery.matches;
      drawContext.lastTime = performance.now();
      drawFrame(drawContext, performance.now());
    };

    resizeContext(drawContext);
    drawFrame(drawContext, performance.now());

    let animationFrame: number | null = null;

    const startAnimation = () => {
      if (drawContext.reduceMotion || document.hidden) {
        return;
      }
      drawContext.lastTime = performance.now();
      const step = (time: number) => {
        drawFrame(drawContext, time);
        if (!document.hidden && !drawContext.reduceMotion) {
          animationFrame = requestAnimationFrame(step);
        } else {
          animationFrame = null;
        }
      };
      animationFrame = requestAnimationFrame(step);
    };

    const stopAnimation = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    if (!reduceMotion) {
      startAnimation();
    }

    const onMotionChange = () => {
      handleMotionChange();
      stopAnimation();
      if (!drawContext.reduceMotion) {
        startAnimation();
      }
    };

    const onVisibilityToggle = () => {
      if (document.hidden) {
        stopAnimation();
      } else if (!drawContext.reduceMotion) {
        startAnimation();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("visibilitychange", onVisibilityToggle);
    reduceMotionQuery.addEventListener("change", onMotionChange);

    return () => {
      stopAnimation();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("visibilitychange", onVisibilityToggle);
      reduceMotionQuery.removeEventListener("change", onMotionChange);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return <canvas ref={canvasRef} className="site-backdrop" aria-hidden />;
}
