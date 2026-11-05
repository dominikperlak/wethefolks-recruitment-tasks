const DESIGN_WIDTH = 360;
const MIN_STAGE_HEIGHT = 610;

const applyFit = (container) => {
  const { clientWidth: width, clientHeight: height } = container;
  const scale = Math.min(width / DESIGN_WIDTH, height / MIN_STAGE_HEIGHT);

  container.style.setProperty("--scale", scale);
  container.style.setProperty("--stage-height", `${height / scale}px`);
};

export const fitStage = (container) => {
  applyFit(container);
  new ResizeObserver(() => applyFit(container)).observe(container);
};
