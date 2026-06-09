import { Application, Container, Graphics, AnimatedSprite } from "pixi.js";
import { getAnimalAnimations, preloadAllSpritesheets, type AnimalState as RenderState } from "./SpriteSheetBuilder";
import type { AnimalState, Personality } from "../engine/types";

interface AnimalSprite {
  id: string;
  container: Container;
  sprite: AnimatedSprite;
  overlay: Graphics;
  personality: Personality;
  currentState: AnimalState;
  facingLeft: boolean;
  lastFlipTime: number;
  tick: number;
}

const DISPLAY_SCALE = 2;
const DISPLAY_SIZE = 32 * DISPLAY_SCALE;

export class ZooRenderer {
  private app: Application | null = null;
  private animals: Map<string, AnimalSprite> = new Map();
  private animalStates: Map<string, AnimalState> = new Map();
  private frameCount = 0;
  private resizeHandler: (() => void) | null = null;

  async init(canvasContainer: HTMLDivElement): Promise<void> {
    this.app = new Application();
    await this.app.init({
      backgroundAlpha: 0,
      antialias: false,
      resolution: 1,
      autoDensity: true,
    });

    canvasContainer.appendChild(this.app.canvas);
    const canvas = this.app.canvas as HTMLCanvasElement;
    canvas.style.pointerEvents = "none";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";

    this.resizeToViewport();
    this.resizeHandler = () => this.resizeToViewport();
    window.addEventListener("resize", this.resizeHandler);

    await preloadAllSpritesheets();

    this.app.ticker.add(() => this.renderLoop());
  }

  resizeToViewport(): void {
    if (!this.app) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.app.renderer.resize(w, h);
  }

  addAnimal(id: string, personality: Personality): void {
    if (!this.app) return;

    const anims = getAnimalAnimations(id);
    const idleFrames = anims.frames.idle ?? anims.frames[Object.keys(anims.frames)[0] as RenderState];

    const sprite = new AnimatedSprite(idleFrames);
    sprite.anchor.set(0.5, 1.0);
    sprite.scale.set(DISPLAY_SCALE);
    sprite.animationSpeed = 0.12;
    sprite.play();

    const overlay = new Graphics();
    const container = new Container();
    container.addChild(sprite);
    container.addChild(overlay);

    container.x = this.app.screen.width / 2;
    container.y = this.app.screen.height / 2;

    this.app.stage.addChild(container);

    this.animals.set(id, {
      id,
      container,
      sprite,
      overlay,
      personality,
      currentState: "idle",
      facingLeft: false,
      lastFlipTime: 0,
      tick: Math.floor(Math.random() * 1000),
    });
  }

  updateAnimal(id: string, x: number, y: number, facingLeft: boolean): void {
    const animal = this.animals.get(id);
    if (!animal) return;

    animal.container.x = x;
    animal.container.y = y;
    if (facingLeft !== animal.facingLeft) {
      if (performance.now() - animal.lastFlipTime > 200) {
        animal.facingLeft = facingLeft;
        animal.sprite.scale.x = facingLeft ? -DISPLAY_SCALE : DISPLAY_SCALE;
        animal.lastFlipTime = performance.now();
      }
    }
  }

  setAnimalState(id: string, animalState: AnimalState): void {
    const animal = this.animals.get(id);
    if (!animal) return;
    if (this.animalStates.get(id) === animalState) return;

    this.animalStates.set(id, animalState);
    animal.currentState = animalState;

    const anims = getAnimalAnimations(animal.id);
    const frames = anims.frames[animalState as RenderState];
    if (!frames || frames.length === 0) return;

    animal.sprite.textures = frames;
    animal.sprite.animationSpeed = animalState === "playful" ? 0.18 : 0.12;
    animal.sprite.gotoAndPlay(0);
  }

  getScreenSize(): { width: number; height: number } {
    if (!this.app) return { width: 300, height: 300 };
    return {
      width: this.app.screen.width,
      height: this.app.screen.height - DISPLAY_SIZE,
    };
  }

  private renderLoop(): void {
    this.frameCount++;

    for (const animal of this.animals.values()) {
      animal.tick++;
      animal.overlay.clear();

      if (animal.currentState === "asleep") {
        this.drawZzz(animal.overlay, 0, -(DISPLAY_SIZE - 8), animal.tick);
      } else if (animal.currentState === "curious" || animal.currentState === "playful") {
        if (animal.tick % 20 < 10) {
          this.drawSparkle(animal.overlay, 12, -(DISPLAY_SIZE - 8), animal.tick);
        }
      } else if (animal.currentState === "annoyed") {
        if (animal.tick % 30 < 15) {
          this.drawAngerMark(animal.overlay, 0, -(DISPLAY_SIZE - 8));
        }
      }
    }
  }

  private drawZzz(g: Graphics, cx: number, topY: number, tick: number): void {
    const phase = (tick * 0.05) % 1.0;
    const yOff = -phase * 18;
    const xOff = phase * 6;
    const alpha = 1 - phase;
    const zx = cx + xOff;
    const zy = topY + yOff;

    g.moveTo(zx, zy);
    g.lineTo(zx + 6, zy);
    g.moveTo(zx + 6, zy);
    g.lineTo(zx, zy + 5);
    g.moveTo(zx, zy + 5);
    g.lineTo(zx + 6, zy + 5);
    g.stroke({ width: 1.5, color: 0xaaccff, alpha });
  }

  private drawSparkle(g: Graphics, cx: number, topY: number, tick: number): void {
    const phase = (tick * 0.1) % 1.0;
    const r = 2 + phase * 3;
    const alpha = 1 - phase;
    g.moveTo(cx - r, topY);
    g.lineTo(cx + r, topY);
    g.moveTo(cx, topY - r);
    g.lineTo(cx, topY + r);
    g.stroke({ width: 1, color: 0xffffff, alpha });
  }

  private drawAngerMark(g: Graphics, cx: number, topY: number): void {
    g.moveTo(cx - 4, topY - 4);
    g.lineTo(cx + 4, topY + 4);
    g.moveTo(cx + 4, topY - 4);
    g.lineTo(cx - 4, topY + 4);
    g.stroke({ width: 2, color: 0xff3344, alpha: 0.8 });
  }

  destroy(): void {
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
      this.resizeHandler = null;
    }
    if (this.app) {
      if (this.app.canvas?.parentElement) {
        this.app.canvas.parentElement.removeChild(this.app.canvas);
      }
      this.app.destroy(true);
      this.app = null;
    }
  }
}
