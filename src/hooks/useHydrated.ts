import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * `false` on the server and during hydration, `true` once the component has hydrated
 * (and on every render of a component that mounts on the client after that).
 */
export const useHydrated = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * Whether the visitor asked for reduced motion — held at `false` on the server and during hydration.
 *
 * Use this instead of Framer Motion's `useReducedMotion`: that hook is `null` on the server but `true` on the
 * first client render in a reduced-motion browser, so branching on it renders different HTML on the client
 * than the server sent (a hydration mismatch). Here the first client render matches the server, the
 * reduced-motion branch takes over right after hydration, and later changes to the OS setting are followed.
 *
 * Components should jump to their final state (no transition) when this is `true`. Elements that start
 * hidden in the server HTML should also carry `data-reveal`, so reduced-motion visitors see their final
 * state from the first paint, before hydration (see the rule in globals.css).
 */
export const useHydratedReducedMotion = () =>
  useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  );
