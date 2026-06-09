import type { AnimalConfig } from "../types";
import { PERSONALITIES, randomVariation } from "../Personality";

export function createDog(): AnimalConfig {
  return { id: "dog", personality: randomVariation(PERSONALITIES.dog) };
}
