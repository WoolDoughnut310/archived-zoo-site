import { useEffect, useRef } from "react";

export default function ZooBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const resources = { renderer: null as any, input: null as any, tickId: 0 };
    let destroyed = false;

    async function init() {
      const container = containerRef.current;
      if (!container || destroyed) return;

      if (container.childNodes.length > 0) return;

      const [{ ZooRenderer }, { AnimalEngine }, { InputManager }, animals] =
        await Promise.all([
          import("../lib/rendering/ZooRenderer"),
          import("../lib/engine/AnimalEngine"),
          import("../lib/engine/InputManager"),
          Promise.all([
            import("../lib/engine/animals/cat").then((m) => m.createCat()),
            import("../lib/engine/animals/dog").then((m) => m.createDog()),
            import("../lib/engine/animals/owl").then((m) => m.createOwl()),
            import("../lib/engine/animals/panda").then((m) => m.createPanda()),
            import("../lib/engine/animals/penguin").then((m) => m.createPenguin()),
            import("../lib/engine/animals/fox").then((m) => m.createFox()),
            import("../lib/engine/animals/rabbit").then((m) => m.createRabbit()),
          ]),
        ]);

      resources.renderer = new ZooRenderer();
      await resources.renderer.init(container);

      const { width: w, height: h } = resources.renderer.getScreenSize();

      const engine = new AnimalEngine();
      const xPositions = animals.map((_, i) => (w / (animals.length + 1)) * (i + 1));
      for (let i = 0; i < animals.length; i++) {
        const x = xPositions[i];
        const y = h * (0.4 + Math.random() * 0.5);
        engine.addAnimal(animals[i], x, y, w, h);
        resources.renderer.addAnimal(animals[i].id, animals[i].personality);
      }

      resources.input = new InputManager();
      resources.input.start();

      function gameLoop() {
        if (destroyed || !resources.renderer || !resources.input) return;

        const inputState = resources.input.getState();
        const size = resources.renderer.getScreenSize();
        const snapshots = engine.tick(inputState, size.width, size.height);

        for (const snap of snapshots) {
          resources.renderer.setAnimalState(snap.id, snap.state);
          resources.renderer.updateAnimal(snap.id, snap.x, snap.y, snap.facingLeft);
        }

        resources.tickId = requestAnimationFrame(gameLoop);
      }

      resources.tickId = requestAnimationFrame(gameLoop);
    }

    init();

    return () => {
      destroyed = true;
      cancelAnimationFrame(resources.tickId);
      resources.input?.stop();
      resources.renderer?.destroy();
    };
  }, []);

  return <div ref={containerRef} />;
}
