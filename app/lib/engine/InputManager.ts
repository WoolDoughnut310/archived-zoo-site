import type { InputState } from "./types";

export class InputManager {
  private state: InputState = {
    cursorX: 0,
    cursorY: 0,
    cursorVelX: 0,
    cursorVelY: 0,
    cursorSpeed: 0,
    keysPerSecond: 0,
    lastInputTime: Date.now(),
    isTyping: false,
    mouseDown: false,
  };

  private prevCursorX = 0;
  private prevCursorY = 0;
  private hasCursorPosition = false;
  private keyPressTimestamps: number[] = [];

  private onMouseMove = (e: MouseEvent) => {
    this.processCursor(e.clientX, e.clientY);
  };

  private onKeyDown = () => {
    const now = Date.now();
    const nowSec = now / 1000;
    this.keyPressTimestamps.push(nowSec);
    this.state.lastInputTime = now;
    this.state.isTyping = true;
  };

  private onMouseDown = () => {
    this.state.mouseDown = true;
  };

  private onMouseUp = () => {
    this.state.mouseDown = false;
  };

  start(): void {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  private processCursor(x: number, y: number): void {
    if (x !== 0 || y !== 0 || this.hasCursorPosition) {
      if (this.hasCursorPosition) {
        this.state.cursorVelX = x - this.prevCursorX;
        this.state.cursorVelY = y - this.prevCursorY;
        this.state.cursorSpeed = Math.sqrt(
          this.state.cursorVelX ** 2 + this.state.cursorVelY ** 2,
        );
      }
      this.hasCursorPosition = true;

      this.state.cursorX = x;
      this.state.cursorY = y;
      this.prevCursorX = x;
      this.prevCursorY = y;

      if (x !== 0 || y !== 0) {
        this.state.lastInputTime = Date.now();
      }
    }
  }

  stop(): void {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("mousedown", this.onMouseDown);
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  getState(): InputState {
    const nowSec = Date.now() / 1000;
    this.keyPressTimestamps = this.keyPressTimestamps.filter((t) => nowSec - t < 1.0);
    this.state.keysPerSecond = this.keyPressTimestamps.length;

    if (Date.now() - this.state.lastInputTime > 3000) {
      this.state.isTyping = false;
    }

    return { ...this.state };
  }
}
