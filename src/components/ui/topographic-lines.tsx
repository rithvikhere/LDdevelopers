"use client";

/**
 * PrequelUI Animate — MIT — https://prequeluianimate.terravidhal.me
 *
 * Local additions (kept small and backwards-compatible):
 * - `pointerStrength`, `smoothing`, `rippleStrength` — tone down how much the terrain reacts to the cursor.
 * - `trackRef` — listen for pointer events on another element (e.g. a hero section whose content sits above
 *   this background and would otherwise receive the events).
 * - Neutral base classes (no built-in background/text/dark colours) — colours come from props / className,
 *   so a visitor's dark-mode setting can't repaint the host section.
 * - Class merging via the project's `cn` (tailwind-merge), so `className` can override `relative` etc.
 */

import * as React from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const subscribe = () => () => {};

function useHydratedReducedMotion() {
  const reduce = useReducedMotion() ?? false;
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return mounted ? reduce : false;
}

function usePageVisible() {
  const [visible, setVisible] = React.useState(true);
  React.useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}

const CELL = 15;

type Ripple = { x: number; y: number; start: number };

function contour(
  path: Path2D,
  x: number,
  y: number,
  size: number,
  a: number,
  b: number,
  c: number,
  d: number,
  level: number,
) {
  const at = (from: number, to: number) =>
    from === to ? 0.5 : (level - from) / (to - from);
  const line = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    path.moveTo(x1, y1);
    path.lineTo(x2, y2);
  };

  const top = () => [x + at(a, b) * size, y] as const;
  const right = () => [x + size, y + at(b, c) * size] as const;
  const bottom = () => [x + at(d, c) * size, y + size] as const;
  const left = () => [x, y + at(a, d) * size] as const;

  const code =
    (a > level ? 8 : 0) |
    (b > level ? 4 : 0) |
    (c > level ? 2 : 0) |
    (d > level ? 1 : 0);

  switch (code) {
    case 0:
    case 15:
      return;
    case 1:
    case 14: {
      const p = left();
      const q = bottom();
      line(p[0], p[1], q[0], q[1]);
      return;
    }
    case 2:
    case 13: {
      const p = bottom();
      const q = right();
      line(p[0], p[1], q[0], q[1]);
      return;
    }
    case 3:
    case 12: {
      const p = left();
      const q = right();
      line(p[0], p[1], q[0], q[1]);
      return;
    }
    case 4:
    case 11: {
      const p = top();
      const q = right();
      line(p[0], p[1], q[0], q[1]);
      return;
    }
    case 6:
    case 9: {
      const p = top();
      const q = bottom();
      line(p[0], p[1], q[0], q[1]);
      return;
    }
    case 7:
    case 8: {
      const p = left();
      const q = top();
      line(p[0], p[1], q[0], q[1]);
      return;
    }
    default: {
      const center = (a + b + c + d) / 4;
      const p1 = left();
      const p2 = top();
      const p3 = bottom();
      const p4 = right();
      if ((code === 5) === center > level) {
        line(p1[0], p1[1], p2[0], p2[1]);
        line(p3[0], p3[1], p4[0], p4[1]);
      } else {
        line(p1[0], p1[1], p3[0], p3[1]);
        line(p2[0], p2[1], p4[0], p4[1]);
      }
    }
  }
}

export type TopographicLinesProps = React.ComponentProps<"div"> & {
  /** Number of contour levels on each side of zero. @default 13 */
  levels?: number;
  /** Animation speed multiplier. @default 1 */
  speed?: number;
  /** Freeze the contour field. @default false */
  paused?: boolean;
  /** Raise the terrain under the pointer and emit ripples on click. @default true */
  interactive?: boolean;
  /** Override the line colour. Defaults to the inherited text colour. */
  lineColor?: string;
  /** Feature size of the terrain, in pixels. @default 170 */
  scale?: number;
  /** How high the pointer raises the terrain (multiplier). @default 1 */
  pointerStrength?: number;
  /** How quickly the raised peak follows the pointer, 0–1 per frame. Lower = lazier. @default 0.14 */
  smoothing?: number;
  /** Amplitude of the click ripples. @default 0.72 */
  rippleStrength?: number;
  /** Listen for pointer events on this element instead of the component itself. */
  trackRef?: React.RefObject<HTMLElement | null>;
};

/**
 * An animated topographic map drawn with marching squares on a canvas. The
 * terrain slowly breathes, and pointer movement raises a local peak while
 * clicks send out contour ripples.
 *
 * @requires react, motion/react
 */
export function TopographicLines({
  levels = 13,
  speed = 1,
  paused = false,
  interactive = true,
  lineColor,
  scale = 170,
  pointerStrength = 1,
  smoothing = 0.14,
  rippleStrength = 0.72,
  trackRef,
  className,
  children,
  onPointerMove,
  onPointerLeave,
  onPointerDown,
  ...props
}: TopographicLinesProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref);
  const pageVisible = usePageVisible();
  const reduce = useHydratedReducedMotion();
  const playing = inView && pageVisible && !reduce && !paused;
  const timeRef = React.useRef(0);
  const ripples = React.useRef<Ripple[]>([]);
  const pointer = React.useRef({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0,
    raise: 0,
    target: 0,
    placed: false,
  });
  const drawRef = React.useRef<(time: number) => void>(() => {});
  const rate = Math.max(0.1, speed);
  const follow = Math.min(1, Math.max(0.01, smoothing));

  const draw = React.useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      const container = ref.current;
      if (!canvas || !container) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width < 2 || height < 2) return;

      const dpr = canvas.width / Math.max(1, width);
      const cols = Math.ceil(width / CELL) + 1;
      const rows = Math.ceil(height / CELL) + 1;
      const field = new Float32Array(cols * rows);
      const feature = Math.max(40, scale);
      const tz = time * 0.00008 * rate;
      const state = pointer.current;
      const rippleList = ripples.current;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < cols; column++) {
          const x = column * CELL;
          const y = row * CELL;
          const nx = x / feature;
          const ny = y / feature;
          let value =
            Math.sin(nx * 1.7 + tz) * 0.55 +
            Math.sin(ny * 2.1 - tz * 0.8) * 0.45 +
            Math.sin((nx + ny) * 1.15 + tz * 0.55) * 0.3 +
            Math.sin(nx * 3.1 - ny * 2.3 + tz * 1.3) * 0.18;
          value /= 1.48;

          if (state.raise > 0.001) {
            const distance = Math.hypot(x - state.smoothX, y - state.smoothY);
            value += state.raise * 0.95 * pointerStrength * Math.exp(-distance / 105);
          }

          for (const ripple of rippleList) {
            const progress = Math.min(
              1,
              Math.max(0, (time - ripple.start) / 2600),
            );
            if (progress >= 1) continue;
            const reach = Math.hypot(width, height) * 0.8;
            const distance =
              Math.hypot(x - ripple.x, y - ripple.y) - progress * reach;
            value +=
              rippleStrength *
              (1 - progress) *
              Math.cos((distance / 58) * 1.8) *
              Math.exp(-(distance * distance) / (2 * 58 * 58));
          }

          field[row * cols + column] = value;
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const color =
        lineColor ??
        (getComputedStyle(container).color || "#1b1b1f");
      const count = Math.max(4, Math.round(levels));
      const step = 1.8 / count;
      const minor = new Path2D();
      const major = new Path2D();

      for (let levelIndex = -count; levelIndex <= count; levelIndex++) {
        const level = levelIndex * step;
        const path = levelIndex % 5 === 0 ? major : minor;
        for (let row = 0; row < rows - 1; row++) {
          for (let column = 0; column < cols - 1; column++) {
            const a = field[row * cols + column]!;
            const b = field[row * cols + column + 1]!;
            const c = field[(row + 1) * cols + column + 1]!;
            const d = field[(row + 1) * cols + column]!;
            const lowest = Math.min(a, b, c, d);
            const highest = Math.max(a, b, c, d);
            if (level < lowest || level > highest) continue;
            contour(path, column * CELL, row * CELL, CELL, a, b, c, d, level);
          }
        }
      }

      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalAlpha = 0.28;
      ctx.lineWidth = 1;
      ctx.stroke(minor);
      ctx.globalAlpha = 0.66;
      ctx.lineWidth = 1.4;
      ctx.stroke(major);
      ctx.globalAlpha = 1;
    },
    [levels, lineColor, rate, scale, pointerStrength, rippleStrength],
  );

  // keep the latest draw function for the rAF loop / resize handler (updated after render, before effects run)
  React.useLayoutEffect(() => {
    drawRef.current = draw;
  });

  React.useEffect(() => {
    const container = ref.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      drawRef.current(reduce ? 0 : timeRef.current);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  React.useEffect(() => {
    if (!playing) {
      drawRef.current(reduce ? 0 : timeRef.current);
      return;
    }
    let frame = 0;
    let last = performance.now();
    let waited = 0;
    const tick = (now: number) => {
      const delta = Math.min(64, now - last);
      last = now;
      waited += delta;
      if (waited >= 33) {
        timeRef.current += waited;
        waited = 0;
        const state = pointer.current;
        state.smoothX += (state.x - state.smoothX) * follow;
        state.smoothY += (state.y - state.smoothY) * follow;
        state.raise += ((interactive ? state.target : 0) - state.raise) * follow * 0.65;
        ripples.current = ripples.current.filter(
          (ripple) => timeRef.current - ripple.start < 2700,
        );
        drawRef.current(timeRef.current);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [interactive, playing, reduce, follow]);

  // Pointer → terrain (shared by the component's own handlers and the optional tracked element)
  const local = (clientX: number, clientY: number) => {
    const rect = ref.current?.getBoundingClientRect();
    return rect ? { x: clientX - rect.left, y: clientY - rect.top } : { x: 0, y: 0 };
  };
  type Handlers = {
    move: (clientX: number, clientY: number) => void;
    leave: () => void;
    down: (clientX: number, clientY: number) => void;
  };
  const handlers = React.useRef<Handlers>({ move: () => {}, leave: () => {}, down: () => {} });
  React.useLayoutEffect(() => {
    handlers.current = {
      move: (clientX, clientY) => {
        if (!interactive || reduce) return;
        const { x, y } = local(clientX, clientY);
        const state = pointer.current;
        if (!state.placed) {
          state.smoothX = x;
          state.smoothY = y;
          state.placed = true;
        }
        state.x = x;
        state.y = y;
        state.target = 1;
      },
      leave: () => {
        pointer.current.target = 0;
      },
      down: (clientX, clientY) => {
        if (!interactive || reduce) return;
        const { x, y } = local(clientX, clientY);
        ripples.current = [...ripples.current.slice(-3), { x, y, start: timeRef.current }];
      },
    };

  });

  React.useEffect(() => {
    const target = trackRef?.current;
    if (!target) return;
    const move = (event: PointerEvent) => handlers.current.move(event.clientX, event.clientY);
    const leave = () => handlers.current.leave();
    const down = (event: PointerEvent) => handlers.current.down(event.clientX, event.clientY);
    target.addEventListener("pointermove", move, { passive: true });
    target.addEventListener("pointerleave", leave);
    target.addEventListener("pointerdown", down, { passive: true });
    return () => {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerleave", leave);
      target.removeEventListener("pointerdown", down);
    };
  }, [trackRef]);

  return (
    <div
      ref={ref}
      data-slot="topographic-lines"
      className={cn("relative size-full overflow-hidden", className)}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (!trackRef) handlers.current.move(event.clientX, event.clientY);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        if (!trackRef) handlers.current.leave();
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (!trackRef) handlers.current.down(event.clientX, event.clientY);
      }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
      {children}
    </div>
  );
}

export default TopographicLines;
