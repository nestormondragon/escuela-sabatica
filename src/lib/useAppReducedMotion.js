import { useReducedMotion } from "framer-motion";
import { useJourney } from "../state/journey/index.js";

export function useAppReducedMotion() {
  const systemReduced = useReducedMotion();
  const { state } = useJourney();
  const setting = state.settings.reducedMotion;

  if (setting === true) return true;
  if (setting === false) return false;
  return Boolean(systemReduced);
}
