const DESIGN_URL = "./design/layout.png";
const DESIGN_WIDTH = 1684;
const DESIGN_HEIGHT = 1018;

const FRAMES = {
  left: { left: 27, top: 49, width: 314, height: 952 },
  top: { left: 345, top: 49, width: 1002, height: 246 },
  right: { left: 1351, top: 49, width: 312, height: 952 },
};

export const isDebugMode = () => new URLSearchParams(window.location.search).get("debug") === "1";

export const createDebugOverlay = (ad) => {
  const frame = FRAMES[ad.dataset.part];
  const scaleX = ad.clientWidth / frame.width;
  const scaleY = ad.clientHeight / frame.height;

  const overlay = document.createElement("div");
  overlay.className = "debug-overlay";
  overlay.style.backgroundImage = `url("${DESIGN_URL}")`;
  overlay.style.backgroundSize = `${DESIGN_WIDTH * scaleX}px ${DESIGN_HEIGHT * scaleY}px`;
  overlay.style.backgroundPosition = `${-frame.left * scaleX}px ${-frame.top * scaleY}px`;
  ad.append(overlay);
};
