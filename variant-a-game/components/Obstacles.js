export const createObstacles = (track, level) =>
  level.map(({ src, width, height, x, y }) => {
    const element = document.createElement("img");
    element.className = "obstacle";
    element.src = src;
    element.alt = "";
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.transform = `translate(${x - width / 2}px, ${y - height / 2}px)`;
    track.append(element);
    return { element, width, height, x, y };
  });
