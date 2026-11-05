const createOutline = (className, { left, top, width, height }) => {
  const element = document.createElement("div");
  element.className = `debug-outline ${className}`;
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.transform = `translate(${left}px, ${top}px)`;
  return element;
};

export const isDebugMode = () => new URLSearchParams(window.location.search).get("debug") === "1";

export const createDebugOverlay = (ad, obstacles) => {
  const track = ad.querySelector(".track");
  const world = ad.querySelector(".world");

  obstacles.forEach((obstacle) => track.append(createOutline("debug-obstacle", obstacle)));
  const playerOutline = createOutline("debug-player", { left: 0, top: 0, width: 0, height: 0 });
  world.append(playerOutline);

  const update = (hitbox, isHit) => {
    const size = hitbox.radius * 2;
    playerOutline.style.width = `${size}px`;
    playerOutline.style.height = `${size}px`;
    playerOutline.style.transform = `translate(${hitbox.x - hitbox.radius}px, ${hitbox.y - hitbox.radius}px)`;
    playerOutline.classList.toggle("is-hit", isHit);
  };

  return { update };
};
