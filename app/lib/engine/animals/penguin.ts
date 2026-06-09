import type { AnimalConfig } from "../types";
import { PERSONALITIES, randomVariation } from "../Personality";

export function createPenguin(): AnimalConfig {
  return { id: "penguin", personality: randomVariation(PERSONALITIES.penguin) };
}
