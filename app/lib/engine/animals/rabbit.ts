import type { AnimalConfig } from "../types";
import { PERSONALITIES, randomVariation } from "../Personality";

export function createRabbit(): AnimalConfig {
  return { id: "rabbit", personality: randomVariation(PERSONALITIES.rabbit) };
}
