export const waitForImages = (root) =>
  Promise.all([...root.querySelectorAll("img")].map((img) => img.decode().catch(() => {})));
