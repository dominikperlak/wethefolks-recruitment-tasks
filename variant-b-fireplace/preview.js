const FIREPLACE_WIDTH = 1680;
const FIREPLACE_HEIGHT = 975;

const applyFit = () => {
  const scale = Math.min(
    1,
    window.innerWidth / FIREPLACE_WIDTH,
    window.innerHeight / FIREPLACE_HEIGHT,
  );
  document.documentElement.style.setProperty("--scale", scale);
};

applyFit();
window.addEventListener("resize", applyFit);
