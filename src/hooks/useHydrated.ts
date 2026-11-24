import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const subscribe = () => () => {};

/**
 * `false` on the server and during hydration, `true` once the component has hydrated
 * (and on every render of a component that mounts on the client after that).
 */
export const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

/**
 * Framer Motion's `useReducedMotion`, held at `false` until hydration has finished.
 *
 * `useReducedMotion` is `null` on the server but `true` on the first client render in a
 * reduced-motion browser, so branching on it directly renders different HTML on the client
 * than the server sent (a hydration mismatch). With this hook the first client render matches
 * the server; the reduced-motion branch takes over right after hydration. Components should
 * therefore jump to their final state (no transition) when this flips to `true`.
 */
export const useHydratedReducedMotion = () => {
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  return hydrated && prefersReducedMotion === true;
};
