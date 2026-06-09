import type { AnimalConfig, InputState, AnimalSnapshot } from "./types";
import { createStateContext, tickState } from "./AnimalStateMachine";
import type { StateContext } from "./AnimalStateMachine";

interface EngineAnimal {
  config: AnimalConfig;
  ctx: StateContext;
}

const COLLISION_RADIUS = 40;

export class AnimalEngine {
  private animals: Map<string, EngineAnimal> = new Map();

  addAnimal(config: AnimalConfig, startX: number, startY: number, windowW: number, windowH: number): void {
    let x = startX;
    let y = startY;
    for (const existing of this.animals.values()) {
      const dx = existing.ctx.posX - x;
      const dy = existing.ctx.posY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < COLLISION_RADIUS && dist > 0.1) {
        const push = (COLLISION_RADIUS - dist + 5) / dist;
        x -= dx * push;
        y -= dy * push;
      }
    }
    x = Math.max(16, Math.min(windowW - 16, x));
    y = Math.max(16, Math.min(windowH - 16, y));
    this.animals.set(config.id, {
      config,
      ctx: createStateContext(x, y, windowW, windowH),
    });
  }

  tick(input: InputState, windowW: number, windowH: number, cursorOffsetX = 0, cursorOffsetY = 0): AnimalSnapshot[] {
    const entries = [...this.animals.values()];

    for (const animal of entries) {
      tickState(animal.ctx, input, animal.config.personality, windowW, windowH, cursorOffsetX, cursorOffsetY);
    }

    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const a = entries[i];
        const b = entries[j];
        const dx = b.ctx.posX - a.ctx.posX;
        const dy = b.ctx.posY - a.ctx.posY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < COLLISION_RADIUS && dist > 0.1) {
          const overlap = (COLLISION_RADIUS - dist) / 2;
          const nx = dx / dist;
          const ny = dy / dist;
          a.ctx.posX -= nx * overlap;
          a.ctx.posY -= ny * overlap;
          b.ctx.posX += nx * overlap;
          b.ctx.posY += ny * overlap;
        }
      }
    }

    for (const animal of entries) {
      animal.ctx.posX = Math.max(16, Math.min(windowW - 16, animal.ctx.posX));
      animal.ctx.posY = Math.max(16, Math.min(windowH - 16, animal.ctx.posY));
    }

    return entries.map((animal) => ({
      id: animal.config.id,
      state: animal.ctx.state,
      x: animal.ctx.posX,
      y: animal.ctx.posY,
      facingLeft: animal.ctx.posX > (input.cursorX - cursorOffsetX),
      animFrame: animal.ctx.stateTicks,
      personality: animal.config.personality,
    }));
  }

  getAnimals() {
    return [...this.animals.values()];
  }

  setAnimalPosition(id: string, x: number, y: number, windowW: number, windowH: number): void {
    const animal = this.animals.get(id);
    if (!animal) return;
    animal.ctx.posX = Math.max(16, Math.min(windowW - 16, x));
    animal.ctx.posY = Math.max(16, Math.min(windowH - 16, y));
    animal.ctx.windowW = windowW;
    animal.ctx.windowH = windowH;
  }
}
