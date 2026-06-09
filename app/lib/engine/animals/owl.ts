import type { AnimalConfig } from "../types";
import { PERSONALITIES, randomVariation } from "../Personality";

export function createOwl(): AnimalConfig {
  return { id: "owl", personality: randomVariation(PERSONALITIES.owl) };
}
