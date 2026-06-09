export type AnimalState =
  | "idle"
  | "curious"
  | "playful"
  | "sleepy"
  | "asleep"
  | "annoyed"
  | "walking";

export interface Personality {
  name: string;
  curiosity: number;
  attentionSpan: number;
  energy: number;
  socialness: number;
  mischief: number;
  sleepiness: number;
  annoyanceThreshold: number;
  curiosityRadius: number;
  walkSpeed: number;
  bodyColor: number;
  eyeColor: number;
  accentColor: number;
}

export interface AnimalConfig {
  id: string;
  personality: Personality;
}

export interface InputState {
  cursorX: number;
  cursorY: number;
  cursorVelX: number;
  cursorVelY: number;
  cursorSpeed: number;
  keysPerSecond: number;
  lastInputTime: number;
  isTyping: boolean;
  mouseDown: boolean;
}

export interface AnimalSnapshot {
  id: string;
  state: AnimalState;
  x: number;
  y: number;
  facingLeft: boolean;
  animFrame: number;
  personality: Personality;
}
