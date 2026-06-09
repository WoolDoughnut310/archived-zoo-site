import type { AnimalConfig } from "../types";
import { PERSONALITIES, randomVariation } from "../Personality";

export function createCat(): AnimalConfig {
  return { id: "cat", personality: randomVariation(PERSONALITIES.cat) };
}
