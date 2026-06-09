import type { AnimalState, InputState, Personality } from "./types";

const IDLE_TO_WALK_CHANCE = 0.008;
const WALK_DURATION_MIN = 60;
const WALK_DURATION_MAX = 180;
const MIN_STATE_TICKS = 20;
const FACING_DEAD_ZONE = 6;

export interface StateContext {
  state: AnimalState;
  stateTicks: number;
  walkTargetX: number;
  walkTargetY: number;
  walkTicksLeft: number;
  posX: number;
  posY: number;
  windowW: number;
  windowH: number;
}

export function createStateContext(
  startX: number,
  startY: number,
  windowW: number,
  windowH: number,
): StateContext {
  return {
    state: "idle",
    stateTicks: 0,
    walkTargetX: startX,
    walkTargetY: startY,
    walkTicksLeft: 0,
    posX: startX,
    posY: startY,
    windowW,
    windowH,
  };
}

function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function tickState(
  ctx: StateContext,
  input: InputState,
  p: Personality,
  windowW: number,
  windowH: number,
  cursorOffsetX = 0,
  cursorOffsetY = 0,
): { state: AnimalState; dx: number; dy: number; facingLeft: boolean } {
  ctx.stateTicks++;
  ctx.windowW = windowW;
  ctx.windowH = windowH;

  const cursorLocalX = input.cursorX - cursorOffsetX;
  const cursorLocalY = input.cursorY - cursorOffsetY;
  const cursorDist = dist(ctx.posX, ctx.posY, cursorLocalX, cursorLocalY);
  const enterCloseDist = p.curiosityRadius * 0.85;
  const exitCloseDist = p.curiosityRadius * 1.15;
  const enterVeryCloseDist = p.curiosityRadius * 0.3;
  const exitVeryCloseDist = p.curiosityRadius * 0.5;
  const cursorMoving = input.cursorSpeed > 0.6;
  const idleTooLong = ctx.stateTicks > 300 * (1 - p.sleepiness + 0.3);
  const typingHeavy = input.keysPerSecond > p.annoyanceThreshold;
  const recent = ctx.stateTicks < MIN_STATE_TICKS;

  let nextState = ctx.state;
  let dx = 0;
  let dy = 0;

  const cursorDx = cursorLocalX - ctx.posX;
  const facingLeft = cursorDx < -FACING_DEAD_ZONE;

  switch (ctx.state) {
    case "idle": {
      if (recent) break;
      if (typingHeavy) {
        nextState = "annoyed";
      } else if (cursorDist < enterCloseDist) {
        nextState = "curious";
      } else if (idleTooLong) {
        nextState = "sleepy";
      } else if (Math.random() < IDLE_TO_WALK_CHANCE * p.energy) {
        nextState = "walking";
        ctx.walkTargetX = 32 + Math.random() * (windowW - 64);
        ctx.walkTargetY = 64 + Math.random() * (windowH - 64);
        ctx.walkTicksLeft =
          WALK_DURATION_MIN + Math.random() * (WALK_DURATION_MAX - WALK_DURATION_MIN);
      }
      break;
    }
    case "curious": {
      if (recent) break;
      if (typingHeavy) {
        nextState = "annoyed";
      } else if (cursorDist < enterVeryCloseDist && cursorMoving) {
        nextState = "playful";
      } else if (cursorDist > exitCloseDist) {
        nextState = "idle";
      } else {
        const angle = Math.atan2(cursorLocalY - ctx.posY, cursorDx);
        dx = Math.cos(angle) * p.walkSpeed * 1.0;
        dy = Math.sin(angle) * p.walkSpeed * 1.0;
      }
      break;
    }
    case "playful": {
      if (recent) break;
      if (cursorDist > exitCloseDist) {
        nextState = "idle";
      } else if (!cursorMoving || cursorDist > exitVeryCloseDist) {
        nextState = "curious";
      } else {
        const angle = Math.atan2(cursorLocalY - ctx.posY, cursorDx);
        dx = Math.cos(angle) * p.walkSpeed * 1.5;
        dy = Math.sin(angle) * p.walkSpeed * 1.5;
      }
      break;
    }
    case "sleepy": {
      if (recent) break;
      if (cursorDist < enterVeryCloseDist && Math.random() < 0.3) {
        nextState = "curious";
      } else if (ctx.stateTicks > 200 * (1 / (p.sleepiness + 0.1))) {
        nextState = "asleep";
      } else if (input.keysPerSecond > 2 || input.cursorSpeed > 0.3) {
        nextState = "idle";
      }
      break;
    }
    case "asleep": {
      if (recent) break;
      if (cursorDist < enterVeryCloseDist && Math.random() < 0.1) {
        nextState = "curious";
      } else if (input.keysPerSecond > 4) {
        nextState = "idle";
      }
      break;
    }
    case "annoyed": {
      if (recent) break;
      if (!typingHeavy) {
        nextState = "idle";
      } else if (cursorDist < enterCloseDist && Math.random() < 0.2) {
        nextState = "curious";
      }
      break;
    }
    case "walking": {
      ctx.walkTicksLeft--;
      const toTargetX = ctx.walkTargetX - ctx.posX;
      const toTargetY = ctx.walkTargetY - ctx.posY;
      const toTargetDist = Math.sqrt(toTargetX ** 2 + toTargetY ** 2);

      if (toTargetDist < 3 || ctx.walkTicksLeft <= 0) {
        nextState = "idle";
      } else {
        dx = (toTargetX / toTargetDist) * p.walkSpeed;
        dy = (toTargetY / toTargetDist) * p.walkSpeed;
      }

      if (!recent && cursorDist < enterCloseDist && Math.random() < p.curiosity * 0.5) {
        nextState = "curious";
      }
      break;
    }
  }

  if (nextState !== ctx.state) {
    ctx.state = nextState;
    ctx.stateTicks = 0;
  }

  ctx.posX = Math.max(32, Math.min(windowW - 32, ctx.posX + dx));
  ctx.posY = Math.max(64, Math.min(windowH, ctx.posY + dy));

  return { state: ctx.state, dx, dy, facingLeft };
}
