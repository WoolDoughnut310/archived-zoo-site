import type { AnimalConfig } from "../types";
import { PERSONALITIES, randomVariation } from "../Personality";

export function createPanda(): AnimalConfig {
  return { id: "panda", personality: randomVariation(PERSONALITIES.panda) };
}
