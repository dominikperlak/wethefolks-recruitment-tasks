const ALPHA_THRESHOLD = 128;

export const createAlphaMask = (image, width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width);
  canvas.height = Math.ceil(height);
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(image, 0, 0, width, height);
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  const mask = new Uint8Array(canvas.width * canvas.height);
  for (let index = 0; index < mask.length; index += 1) {
    mask[index] = data[index * 4 + 3] >= ALPHA_THRESHOLD ? 1 : 0;
  }
  return { mask, columns: canvas.width, rows: canvas.height };
};

export const circleHitsMask = (circle, target) => {
  const { left, top, alphaMask } = target;
  const { mask, columns, rows } = alphaMask;
  const fromColumn = Math.max(Math.floor(circle.x - circle.radius - left), 0);
  const toColumn = Math.min(Math.ceil(circle.x + circle.radius - left), columns - 1);
  const fromRow = Math.max(Math.floor(circle.y - circle.radius - top), 0);
  const toRow = Math.min(Math.ceil(circle.y + circle.radius - top), rows - 1);

  for (let row = fromRow; row <= toRow; row += 1) {
    for (let column = fromColumn; column <= toColumn; column += 1) {
      if (!mask[row * columns + column]) continue;
      const distanceX = left + column + 0.5 - circle.x;
      const distanceY = top + row + 0.5 - circle.y;
      if (distanceX ** 2 + distanceY ** 2 <= circle.radius ** 2) return true;
    }
  }
  return false;
};
