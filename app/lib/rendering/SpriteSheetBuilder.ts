import { Texture, ImageSource, Rectangle } from "pixi.js";

export type AnimalState =
  | "idle" | "curious" | "playful" | "sleepy" | "asleep" | "annoyed" | "walking";

export type AnimalAnimations = {
  frames: Record<AnimalState, Texture[]>;
  frameWidth: number;
  frameHeight: number;
};

interface SpriteSheetJSON {
  frames: Record<string, { frame: { x: number; y: number; w: number; h: number } }>;
  animations: Record<string, string[]>;
}

const SHEET_PATH = "/sprites";

let cachedSheets: Map<string, AnimalAnimations> | null = null;

async function loadAnimalSheet(animalId: string): Promise<AnimalAnimations> {
  const jsonResp = await fetch(`${SHEET_PATH}/${animalId}/sheet.json`);
  const json: SpriteSheetJSON = await jsonResp.json();

  const img = new Image();
  img.src = `${SHEET_PATH}/${animalId}/sheet.png`;
  await img.decode();

  const source = new ImageSource({ resource: img, scaleMode: "nearest", resolution: 1 });
  const baseTex = new Texture({ source });

  const textures: Record<string, Texture> = {};
  for (const [name, f] of Object.entries(json.frames)) {
    textures[name] = new Texture({
      source: baseTex.source,
      frame: new Rectangle(f.frame.x, f.frame.y, f.frame.w, f.frame.h),
    });
  }

  const frames = {} as Record<AnimalState, Texture[]>;
  for (const [state, frameNames] of Object.entries(json.animations)) {
    if (state === "walk") continue;
    frames[state as AnimalState] = frameNames.map((n) => textures[n]);
  }

  const firstFrames = json.animations[Object.keys(json.animations)[0]];
  const firstInfo = json.frames[firstFrames?.[0]];
  return {
    frames,
    frameWidth: firstInfo?.frame.w ?? 32,
    frameHeight: firstInfo?.frame.h ?? 32,
  };
}

export async function preloadAllSpritesheets(): Promise<void> {
  const animals = ["cat", "dog", "owl", "panda", "penguin", "fox", "rabbit"];
  cachedSheets = new Map();
  for (const id of animals) {
    const sheet = await loadAnimalSheet(id);
    cachedSheets.set(id, sheet);
  }
}

export function getAnimalAnimations(animalId: string): AnimalAnimations {
  if (!cachedSheets || !cachedSheets.has(animalId)) {
    throw new Error("Spritesheets not loaded yet. Call preloadAllSpritesheets() first.");
  }
  return cachedSheets.get(animalId)!;
}
