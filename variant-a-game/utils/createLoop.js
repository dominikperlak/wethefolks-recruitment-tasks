const MAX_DELTA = 1 / 30;

export const createLoop = (update) => {
  let frameId = null;
  let lastTime = 0;

  const tick = (time) => {
    const delta = Math.min((time - lastTime) / 1000, MAX_DELTA);
    lastTime = time;
    update(delta);
    if (frameId !== null) frameId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (frameId !== null) return;
    lastTime = performance.now();
    frameId = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (frameId === null) return;
    cancelAnimationFrame(frameId);
    frameId = null;
  };

  return { start, stop };
};
