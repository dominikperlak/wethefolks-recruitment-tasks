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

const forwardQuery = () => {
  const { search } = window.location;
  if (!search) return;
  document.querySelectorAll(".part").forEach((part) => {
    part.src = `${part.getAttribute("src")}${search}`;
  });
};

applyFit();
forwardQuery();
window.addEventListener("resize", applyFit);
