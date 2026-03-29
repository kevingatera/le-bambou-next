"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.35;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const distanceBetween = (first: Point, second: Point) => {
  const dx = second.x - first.x;
  const dy = second.y - first.y;
  return Math.hypot(dx, dy);
};

const midpointBetween = (first: Point, second: Point): Point => ({
  x: (first.x + second.x) / 2,
  y: (first.y + second.y) / 2,
});

export const InteractiveLightboxImage = ({
  src,
  alt,
  width,
  height,
  isLoading,
  onLoad,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  isLoading: boolean;
  onLoad: () => void;
}) => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const dragStateRef = useRef<{
    pointerId: number;
    startPointer: Point;
    startOffset: Point;
  } | null>(null);
  const pinchStateRef = useRef<{
    startDistance: number;
    startScale: number;
    startOffset: Point;
    startMidpoint: Point;
  } | null>(null);
  const activeTouchesRef = useRef<Map<number, Point>>(new Map());

  useEffect(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    dragStateRef.current = null;
    pinchStateRef.current = null;
    activeTouchesRef.current.clear();
  }, [src]);

  const clampOffset = (nextOffset: Point, nextScale: number) => {
    const frame = frameRef.current;
    if (!frame || nextScale <= 1) {
      return { x: 0, y: 0 };
    }

    const frameRect = frame.getBoundingClientRect();
    const fittedWidth = Math.min(frameRect.width, frameRect.height * (width / height));
    const fittedHeight = Math.min(frameRect.height, frameRect.width * (height / width));
    const maxX = Math.max(((fittedWidth * nextScale) - fittedWidth) / 2, 0);
    const maxY = Math.max(((fittedHeight * nextScale) - fittedHeight) / 2, 0);

    return {
      x: clamp(nextOffset.x, -maxX, maxX),
      y: clamp(nextOffset.y, -maxY, maxY),
    };
  };

  const applyScale = (nextScale: number) => {
    const clampedScale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
    setScale(clampedScale);
    setOffset((currentOffset) => clampOffset(currentOffset, clampedScale));
  };

  const zoomBy = (delta: number) => {
    applyScale(scale + delta);
  };

  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const point = { x: event.clientX, y: event.clientY };
    activeTouchesRef.current.set(event.pointerId, point);

    if (activeTouchesRef.current.size === 2) {
      const [first, second] = Array.from(activeTouchesRef.current.values());
      if (!first || !second) return;

      pinchStateRef.current = {
        startDistance: distanceBetween(first, second),
        startScale: scale,
        startOffset: offset,
        startMidpoint: midpointBetween(first, second),
      };
      dragStateRef.current = null;
      return;
    }

    if (scale <= 1) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startPointer: point,
      startOffset: offset,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activeTouchesRef.current.has(event.pointerId)) {
      activeTouchesRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });
    }

    if (pinchStateRef.current && activeTouchesRef.current.size >= 2) {
      const [first, second] = Array.from(activeTouchesRef.current.values());
      if (!first || !second) return;

      const nextScale = clamp(
        pinchStateRef.current.startScale *
          (distanceBetween(first, second) / Math.max(pinchStateRef.current.startDistance, 1)),
        MIN_SCALE,
        MAX_SCALE,
      );

      const currentMidpoint = midpointBetween(first, second);
      const delta = {
        x: currentMidpoint.x - pinchStateRef.current.startMidpoint.x,
        y: currentMidpoint.y - pinchStateRef.current.startMidpoint.y,
      };

      setScale(nextScale);
      setOffset(clampOffset({
        x: pinchStateRef.current.startOffset.x + delta.x,
        y: pinchStateRef.current.startOffset.y + delta.y,
      }, nextScale));
      return;
    }

    const dragState = dragStateRef.current;
    if (dragState?.pointerId !== event.pointerId) {
      return;
    }

    const delta = {
      x: event.clientX - dragState.startPointer.x,
      y: event.clientY - dragState.startPointer.y,
    };

    setOffset(clampOffset({
      x: dragState.startOffset.x + delta.x,
      y: dragState.startOffset.y + delta.y,
    }, scale));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    activeTouchesRef.current.delete(event.pointerId);

    if (dragStateRef.current?.pointerId === event.pointerId) {
      dragStateRef.current = null;
    }

    if (activeTouchesRef.current.size < 2) {
      pinchStateRef.current = null;
    }

    if (scale <= 1) {
      setOffset({ x: 0, y: 0 });
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaY) < 2) return;
    event.preventDefault();
    applyScale(scale + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP));
  };

  return (
    <div
      ref={frameRef}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${
        scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
      }`}
      onDoubleClick={() => {
        if (scale > 1) {
          resetView();
        } else {
          applyScale(2);
        }
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      style={{ touchAction: "none" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        unoptimized
        sizes="(max-width: 768px) 92vw, 88vw"
        className={`max-h-[calc(100dvh-10rem)] max-w-full object-contain transition-opacity duration-200 sm:max-h-[calc(100dvh-10rem)] ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoadingComplete={onLoad}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
          transformOrigin: "center center",
          transition: dragStateRef.current || pinchStateRef.current
            ? "opacity 200ms ease"
            : "transform 180ms ease, opacity 200ms ease",
          willChange: "transform",
          userSelect: "none",
        }}
        draggable={false}
      />
      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 sm:bottom-4">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/55 px-2 py-2 text-white backdrop-blur">
          <button
            type="button"
            onClick={() => zoomBy(-ZOOM_STEP)}
            className="rounded-full px-2 py-1 text-sm transition hover:bg-white/10"
            aria-label="Zoom out"
          >
            -
          </button>
          <button
            type="button"
            onClick={resetView}
            className="rounded-full px-3 py-1 text-xs font-medium tracking-[0.16em] text-white/80 transition hover:bg-white/10"
            aria-label="Reset zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            type="button"
            onClick={() => zoomBy(ZOOM_STEP)}
            className="rounded-full px-2 py-1 text-sm transition hover:bg-white/10"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
