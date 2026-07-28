"use client";

import { useEffect, useRef, useState } from "react";
import type { Hotspot } from "@/lib/comic-types";

type SceneId = NonNullable<Hotspot["animation"]>;

type Point = { x: number; y: number };

const VIEW_W = 900;
const VIEW_H = 966;
const BACKGROUND = "/comics/electric-sheep/animations/page6-dream/background-v1.png";
const SHEEP =
  "/comics/electric-sheep/animations/page6-dream/sleeping-sheep-sprite-v1.png";

const nodes: Point[] = [
  { x: 130, y: 160 },
  { x: 250, y: 92 },
  { x: 370, y: 145 },
  { x: 470, y: 72 },
  { x: 585, y: 145 },
  { x: 700, y: 88 },
  { x: 790, y: 180 },
  { x: 650, y: 235 },
  { x: 500, y: 205 },
  { x: 340, y: 235 },
  { x: 205, y: 250 },
];

const edges: [number, number][] = [
  [0, 1], [0, 10], [1, 2], [1, 3], [2, 3], [2, 9], [3, 4], [3, 5],
  [3, 8], [4, 5], [4, 7], [4, 8], [5, 6], [6, 7], [7, 8], [8, 9],
  [9, 10], [2, 8],
];

const evidence: Point[] = [
  { x: 325, y: 475 },
  { x: 765, y: 650 },
  { x: 455, y: 755 },
  { x: 548, y: 490 },
];

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function drawScene(
  context: CanvasRenderingContext2D,
  background: HTMLImageElement,
  sheep: HTMLImageElement,
  elapsed: number,
  pointer: Point | null,
) {
  const cycle = elapsed % 15000;
  const constellationFade =
    cycle > 12500 ? clamp(1 - (cycle - 12500) / 2500) : 1;
  context.clearRect(0, 0, VIEW_W, VIEW_H);
  context.drawImage(background, 0, 0, VIEW_W, VIEW_H);

  const lanternPulse = 0.5 + Math.sin(elapsed / 280) * 0.12 + Math.sin(elapsed / 97) * 0.05;
  const lanternGlow = context.createRadialGradient(140, 628, 4, 140, 628, 115);
  lanternGlow.addColorStop(0, `rgba(240, 180, 82, ${0.2 * lanternPulse})`);
  lanternGlow.addColorStop(0.35, `rgba(190, 98, 46, ${0.1 * lanternPulse})`);
  lanternGlow.addColorStop(1, "rgba(30, 16, 8, 0)");
  context.fillStyle = lanternGlow;
  context.fillRect(20, 505, 240, 245);

  const breath = 1 + Math.sin(elapsed / 720) * 0.008;
  const sheepWidth = 540;
  const sheepHeight = sheepWidth * (sheep.height / sheep.width);
  const sheepX = 450;
  const sheepBottom = 780;
  context.save();
  context.translate(sheepX, sheepBottom);
  context.scale(1 - (breath - 1) * 0.35, breath);
  context.drawImage(
    sheep,
    -sheepWidth / 2,
    -sheepHeight,
    sheepWidth,
    sheepHeight,
  );
  context.restore();

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";
  context.globalAlpha = constellationFade;
  context.shadowColor = "rgba(92, 229, 255, 0.9)";
  context.shadowBlur = 12;

  evidence.forEach((source, index) => {
    const target = nodes[[10, 7, 9, 8][index]];
    const progress = clamp((cycle - 350 - index * 260) / 850);
    if (progress <= 0) return;
    context.beginPath();
    context.moveTo(source.x, source.y);
    const controlX = source.x + (target.x - source.x) * 0.42;
    const controlY = source.y - 115;
    const endX = source.x + (target.x - source.x) * progress;
    const endY = source.y + (target.y - source.y) * progress;
    context.quadraticCurveTo(controlX, controlY, endX, endY);
    context.strokeStyle = `rgba(91, 221, 246, ${0.56 * progress})`;
    context.lineWidth = 2.2;
    context.stroke();
  });

  edges.forEach(([from, to], index) => {
    const progress = clamp((cycle - 1500 - index * 210) / 650);
    if (progress <= 0) return;
    const a = nodes[from];
    const b = nodes[to];
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(a.x + (b.x - a.x) * progress, a.y + (b.y - a.y) * progress);
    context.strokeStyle = `rgba(112, 228, 247, ${0.7 * progress})`;
    context.lineWidth = 1.7;
    context.stroke();
  });

  nodes.forEach((node, index) => {
    const reveal = clamp((cycle - 1150 - index * 180) / 500);
    if (reveal <= 0) return;
    const distance = pointer
      ? Math.hypot(pointer.x - node.x, pointer.y - node.y)
      : Infinity;
    const hover = clamp(1 - distance / 130);
    const pulse = 0.8 + Math.sin(elapsed / 380 + index) * 0.18;
    const radius = (4.5 + hover * 4) * reveal;
    context.beginPath();
    context.arc(node.x, node.y, radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(205, 251, 255, ${pulse})`;
    context.fill();
  });
  context.restore();

  for (let index = 0; index < 13; index += 1) {
    const x = 70 + ((index * 137) % 770);
    const y = 315 + ((index * 83) % 520) + Math.sin(elapsed / 1100 + index) * 9;
    const alpha = 0.12 + (Math.sin(elapsed / 620 + index * 1.8) + 1) * 0.07;
    context.fillStyle = `rgba(151, 229, 236, ${alpha})`;
    context.fillRect(x, y, 1.5, 1.5);
  }

  const vignette = context.createRadialGradient(450, 470, 330, 450, 470, 690);
  vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.35)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, VIEW_W, VIEW_H);
}

export function LivingWoodcut({ scene, label }: { scene: SceneId; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<{ background: HTMLImageElement; sheep: HTMLImageElement } | null>(
    null,
  );
  const frameRef = useRef<number | null>(null);
  const startedRef = useRef(0);
  const elapsedRef = useRef(0);
  const pointerRef = useRef<Point | null>(null);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(true);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    let active = true;
    Promise.all([loadImage(BACKGROUND), loadImage(SHEEP)]).then(
      ([background, sheep]) => {
        if (!active) return;
        imagesRef.current = { background, sheep };
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        elapsedRef.current = reducedMotion ? 9000 : 0;
        setRunning(!reducedMotion);
        setReady(true);
      },
    );
    return () => {
      active = false;
    };
  }, [scene]);

  useEffect(() => {
    if (!ready || !imagesRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = VIEW_W * pixelRatio;
    canvas.height = VIEW_H * pixelRatio;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    startedRef.current = performance.now() - elapsedRef.current;

    const render = (time: number) => {
      if (running) elapsedRef.current = time - startedRef.current;
      drawScene(
        context,
        imagesRef.current!.background,
        imagesRef.current!.sheep,
        elapsedRef.current,
        pointerRef.current,
      );
      if (running) frameRef.current = window.requestAnimationFrame(render);
    };
    render(performance.now());

    return () => {
      if (frameRef.current != null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [ready, replay, running]);

  const replayScene = () => {
    elapsedRef.current = 0;
    setReplay((value) => value + 1);
    setRunning(true);
  };

  return (
    <div className="living-woodcut">
      <canvas
        ref={canvasRef}
        className="living-woodcut-canvas"
        role="img"
        aria-label={`${label}: a sleeping engraved sheep breathes while evidence forms a cyan provenance constellation overhead.`}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          pointerRef.current = {
            x: ((event.clientX - rect.left) / rect.width) * VIEW_W,
            y: ((event.clientY - rect.top) / rect.height) * VIEW_H,
          };
        }}
        onPointerLeave={() => {
          pointerRef.current = null;
        }}
      />
      {!ready && <p className="living-woodcut-loading">Preparing the dream…</p>}
      <div className="living-woodcut-controls" aria-label="Animation controls">
        <button type="button" onClick={() => setRunning((value) => !value)} disabled={!ready}>
          {running ? "Pause motion" : "Resume motion"}
        </button>
        <button type="button" onClick={replayScene} disabled={!ready}>
          Replay dream
        </button>
      </div>
    </div>
  );
}
