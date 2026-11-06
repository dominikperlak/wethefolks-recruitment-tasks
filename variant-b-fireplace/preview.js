import { READY_MESSAGE, START_MESSAGE } from "./utils/messages.js";

const FIREPLACE_WIDTH = 1680;
const FIREPLACE_HEIGHT = 975;

const parts = [...document.querySelectorAll(".part")];

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
  parts.forEach((part) => {
    part.src = `${part.getAttribute("src")}${search}`;
  });
};

const syncStart = () => {
  const ready = new Set();
  window.addEventListener("message", ({ data, source }) => {
    if (data?.type !== READY_MESSAGE) return;
    if (!parts.some((part) => part.contentWindow === source)) return;
    ready.add(source);
    if (ready.size < parts.length) return;
    parts.forEach((part) => part.contentWindow.postMessage({ type: START_MESSAGE }, "*"));
  });
};

applyFit();
syncStart();
forwardQuery();
window.addEventListener("resize", applyFit);
