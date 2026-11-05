export const createObstacles = (track, level) =>
  level.map(({ src, width, height, x, y }) => {
    const left = x - width / 2;
    const top = y - height / 2;
    const element = document.createElement("img");
    element.className = "obstacle";
    element.src = src;
    element.alt = "";
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.transform = `translate(${left}px, ${top}px)`;
    track.append(element);
    return { element, left, top, width, height, alphaMask: null };
  });
