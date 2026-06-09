import type { AnimalConfig } from "../types";
import { PERSONALITIES, randomVariation } from "../Personality";

export function createFox(): AnimalConfig {
  return { id: "fox", personality: randomVariation(PERSONALITIES.fox) };
}
